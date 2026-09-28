import "server-only";

import { Resend } from "resend";

import { getEmailConfig } from "./config";
import { ContactEnquiryEmail, createContactEmailText } from "./email-template";
import type { ContactSubmission } from "./types";

export class ContactEmailError extends Error {
  constructor(readonly providerCode: string) {
    super("The contact email could not be accepted by the provider.");
    this.name = "ContactEmailError";
  }
}

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const config = getEmailConfig();
  const resend = new Resend(config.apiKey);
  const result = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: submission.email,
    subject: "[Barbara GmbH Website] Neue Kontaktanfrage",
    react: <ContactEnquiryEmail submission={submission} />,
    text: createContactEmailText(submission),
  });

  if (result.error) {
    throw new ContactEmailError(sanitizeProviderCode(result.error.name));
  }
}

function sanitizeProviderCode(value: string): string {
  const sanitized = value.toLowerCase().replace(/[^a-z0-9_-]/g, "-").slice(0, 80);
  return sanitized || "unknown";
}
