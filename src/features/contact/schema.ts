import { z } from "zod";

import {
  contactFieldErrorCodes,
  contactFields,
  contactServices,
  type ContactField,
  type ContactFieldErrorCode,
} from "./types";

const optionalText = (maximum: number, errorCode: ContactFieldErrorCode) =>
  z
    .string()
    .trim()
    .max(maximum, errorCode)
    .transform((value) => value || undefined);

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "nameLength").max(100, "nameLength"),
  company: optionalText(120, "companyLength"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(254, "invalidEmail")
    .email("invalidEmail")
    .transform((value) => value.toLowerCase()),
  phone: optionalText(40, "phoneLength"),
  service: z
    .string()
    .transform((value) => value || undefined)
    .pipe(z.enum(contactServices, { error: "invalidService" }).optional()),
  message: z.string().trim().min(10, "messageLength").max(5_000, "messageLength"),
  privacy: z
    .string()
    .refine((value) => value === "on", "privacyRequired")
    .transform(() => true as const),
});

export type ValidatedContactForm = z.output<typeof contactFormSchema>;

const fieldSet = new Set<string>(contactFields);
const errorCodeSet = new Set<string>(contactFieldErrorCodes);

export function validateContactForm(formData: FormData) {
  return contactFormSchema.safeParse({
    name: getFormString(formData, "name"),
    company: getFormString(formData, "company"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    service: getFormString(formData, "service"),
    message: getFormString(formData, "message"),
    privacy: getFormString(formData, "privacy"),
  });
}

export function getFormString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

export function mapContactFieldErrors(error: z.ZodError): Partial<
  Record<ContactField, ContactFieldErrorCode[]>
> {
  const mapped: Partial<Record<ContactField, ContactFieldErrorCode[]>> = {};

  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "");
    const code = issue.message;

    if (!fieldSet.has(field) || !errorCodeSet.has(code)) {
      continue;
    }

    const contactField = field as ContactField;
    const contactCode = code as ContactFieldErrorCode;
    mapped[contactField] = [...(mapped[contactField] ?? []), contactCode];
  }

  return mapped;
}
