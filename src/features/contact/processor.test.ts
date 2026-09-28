import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  processContactSubmission,
  type ContactDependencies,
} from "./processor";
import type { ContactSubmission } from "./types";

function validFormData(overrides: Record<string, string> = {}) {
  const values = {
    name: "Erika Muster",
    company: "Muster GmbH",
    email: "Erika@Example.at",
    phone: "+43 660 123456",
    service: "office-cleaning",
    message: "Bitte senden Sie mir ein Angebot.",
    privacy: "on",
    website: "",
    ...overrides,
  };
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }

  return formData;
}

function createDependencies(): ContactDependencies & {
  checkRateLimit: ReturnType<typeof vi.fn>;
  sendEmail: ReturnType<typeof vi.fn>;
} {
  return {
    checkRateLimit: vi.fn().mockResolvedValue(true),
    sendEmail: vi.fn().mockResolvedValue(undefined),
    now: () => new Date("2026-09-22T10:00:00.000Z"),
  };
}

describe("processContactSubmission", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("rate limits, normalizes, and sends a valid submission exactly once", async () => {
    const dependencies = createDependencies();

    const state = await processContactSubmission("de", validFormData(), {
      clientIp: "203.0.113.8",
      dependencies,
    });

    expect(state).toEqual({ status: "success", message: "success" });
    expect(dependencies.checkRateLimit).toHaveBeenNthCalledWith(1, "ip", "203.0.113.8");
    expect(dependencies.checkRateLimit).toHaveBeenNthCalledWith(2, "email", "erika@example.at");
    expect(dependencies.sendEmail).toHaveBeenCalledTimes(1);
    expect(dependencies.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining<ContactSubmission>({
        name: "Erika Muster",
        company: "Muster GmbH",
        email: "erika@example.at",
        phone: "+43 660 123456",
        service: "office-cleaning",
        message: "Bitte senden Sie mir ein Angebot.",
        privacy: true,
        locale: "de",
        receivedAt: "2026-09-22T10:00:00.000Z",
      }),
    );
  });

  it("never sends invalid input", async () => {
    const dependencies = createDependencies();

    const state = await processContactSubmission(
      "en",
      validFormData({ email: "invalid", message: "short" }),
      { clientIp: "203.0.113.8", dependencies },
    );

    expect(state.status).toBe("validation-error");
    expect(state.fieldErrors).toMatchObject({
      email: ["invalidEmail"],
      message: ["messageLength"],
    });
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("simulates success for a filled honeypot without external calls", async () => {
    const dependencies = createDependencies();

    const state = await processContactSubmission(
      "de",
      validFormData({ website: "https://spam.example" }),
      { clientIp: "203.0.113.8", dependencies },
    );

    expect(state).toEqual({ status: "success", message: "success" });
    expect(dependencies.checkRateLimit).not.toHaveBeenCalled();
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("blocks an IP before validation or email delivery", async () => {
    const dependencies = createDependencies();
    dependencies.checkRateLimit.mockResolvedValueOnce(false);

    const state = await processContactSubmission("de", validFormData(), {
      clientIp: "203.0.113.8",
      dependencies,
    });

    expect(state).toEqual({ status: "rate-limited", message: "rateLimited" });
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("blocks an email after successful validation", async () => {
    const dependencies = createDependencies();
    dependencies.checkRateLimit
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    const state = await processContactSubmission("de", validFormData(), {
      clientIp: "203.0.113.8",
      dependencies,
    });

    expect(state).toEqual({ status: "rate-limited", message: "rateLimited" });
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("fails closed when rate limiting is unavailable without logging personal data", async () => {
    const dependencies = createDependencies();
    dependencies.checkRateLimit.mockRejectedValueOnce(
      new Error("Erika Muster erika@example.at sensitive-token"),
    );

    const state = await processContactSubmission("de", validFormData(), {
      clientIp: "203.0.113.8",
      dependencies,
    });

    expect(state).toEqual({ status: "service-error", message: "serviceError" });
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
    const logged = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(logged).toContain("rate-limit-unavailable");
    expect(logged).not.toMatch(/Erika|example\.at|sensitive-token|203\.0\.113\.8/);
  });

  it("returns a generic error when email delivery fails", async () => {
    const dependencies = createDependencies();
    dependencies.sendEmail.mockRejectedValueOnce(new Error("provider secret"));

    const state = await processContactSubmission("de", validFormData(), {
      clientIp: "203.0.113.8",
      dependencies,
    });

    expect(state).toEqual({ status: "service-error", message: "serviceError" });
    expect(JSON.stringify(state)).not.toMatch(/Erika|example\.at|provider secret/);
  });
});
