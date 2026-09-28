import type { AnchorHTMLAttributes, ReactNode } from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import deMessages from "@/messages/de.json";
import enMessages from "@/messages/en.json";
import type { ContactActionState } from "@/src/features/contact";

import { ContactForm } from "./ContactForm";

vi.mock("@/src/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  ),
}));

type FormAction = (
  locale: string,
  previousState: ContactActionState,
  formData: FormData,
) => Promise<ContactActionState>;

function renderForm(locale: "de" | "en", action: FormAction) {
  const messages = locale === "de" ? deMessages : enMessages;

  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ContactForm action={action} />
    </NextIntlClientProvider>,
  );
}

describe("ContactForm", () => {
  it("shows accessible field errors and preserves values after validation fails", async () => {
    const action = vi.fn<FormAction>().mockResolvedValue({
      status: "validation-error",
      message: "validationError",
      fieldErrors: { email: ["invalidEmail"] },
    });
    renderForm("en", action);

    const name = screen.getByLabelText(/Name/);
    const email = screen.getByLabelText(/Email/);
    fireEvent.change(name, { target: { value: "Erika Muster" } });
    fireEvent.change(email, { target: { value: "invalid" } });
    fireEvent.submit(screen.getByRole("form", { hidden: true }));

    expect(await screen.findByText("Please enter a valid email address.")).toBeVisible();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby", "email-error");
    expect(name).toHaveValue("Erika Muster");
  });

  it("disables the form and shows its loading state while submitting", async () => {
    let resolveAction: ((state: ContactActionState) => void) | undefined;
    const action = vi.fn<FormAction>().mockImplementation(
      () => new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    renderForm("en", action);

    fireEvent.submit(screen.getByRole("form", { hidden: true }));

    await waitFor(() => expect(screen.getByRole("button")).toBeDisabled());
    expect(screen.getByText("Sending enquiry")).toBeVisible();

    resolveAction?.({ status: "service-error", message: "serviceError" });
    await screen.findByText("Your enquiry could not be sent.");
  });

  it("resets the fields and announces the exact German success message", async () => {
    const action = vi.fn<FormAction>().mockResolvedValue({
      status: "success",
      message: "success",
    });
    renderForm("de", action);

    const name = screen.getByLabelText(/Name/);
    const privacy = screen.getByRole("checkbox");
    fireEvent.change(name, { target: { value: "Erika Muster" } });
    fireEvent.click(privacy);
    fireEvent.submit(screen.getByRole("form", { hidden: true }));

    expect(await screen.findByText("Vielen Dank für Ihre Anfrage.")).toBeVisible();
    expect(screen.getByText("Wir melden uns so schnell wie möglich bei Ihnen.")).toBeVisible();
    await waitFor(() => expect(name).toHaveValue(""));
    expect(privacy).not.toBeChecked();
  });
});
