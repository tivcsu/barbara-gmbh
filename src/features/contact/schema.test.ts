import { describe, expect, it } from "vitest";

import { mapContactFieldErrors, validateContactForm } from "./schema";

function validFormData(overrides: Record<string, string> = {}) {
  const values = {
    name: "  Erika Muster  ",
    company: "  Muster GmbH  ",
    email: "  Erika@Example.at  ",
    phone: " +43 660 123456 ",
    service: "office-cleaning",
    message: "  Bitte senden Sie mir ein Angebot.  ",
    privacy: "on",
    ...overrides,
  };
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }

  return formData;
}

describe("contactFormSchema", () => {
  it("normalizes a valid submission", () => {
    const result = validateContactForm(validFormData());

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data).toEqual({
      name: "Erika Muster",
      company: "Muster GmbH",
      email: "erika@example.at",
      phone: "+43 660 123456",
      service: "office-cleaning",
      message: "Bitte senden Sie mir ein Angebot.",
      privacy: true,
    });
  });

  it("turns empty optional values into undefined", () => {
    const result = validateContactForm(
      validFormData({ company: "", phone: "", service: "" }),
    );

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.company).toBeUndefined();
    expect(result.data.phone).toBeUndefined();
    expect(result.data.service).toBeUndefined();
  });

  it.each([
    ["name", "A", "nameLength"],
    ["company", "C".repeat(121), "companyLength"],
    ["email", "not-an-email", "invalidEmail"],
    ["phone", "1".repeat(41), "phoneLength"],
    ["service", "unknown", "invalidService"],
    ["message", "too short", "messageLength"],
    ["privacy", "", "privacyRequired"],
  ])("returns an accessible error code for invalid %s", (field, value, code) => {
    const result = validateContactForm(validFormData({ [field]: value }));

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(mapContactFieldErrors(result.error)).toMatchObject({
      [field]: expect.arrayContaining([code]),
    });
  });
});
