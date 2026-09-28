import type { Locale } from "@/src/i18n/routing";

export const contactServices = [
  "maintenance-cleaning",
  "office-cleaning",
  "building-cleaning",
  "window-cleaning",
  "deep-cleaning",
  "other",
] as const;

export type ContactService = (typeof contactServices)[number];

export const contactFields = [
  "name",
  "company",
  "email",
  "phone",
  "service",
  "message",
  "privacy",
] as const;

export type ContactField = (typeof contactFields)[number];

export const contactFieldErrorCodes = [
  "required",
  "nameLength",
  "companyLength",
  "invalidEmail",
  "phoneLength",
  "invalidService",
  "messageLength",
  "privacyRequired",
] as const;

export type ContactFieldErrorCode = (typeof contactFieldErrorCodes)[number];

export type ContactActionStatus =
  | "idle"
  | "validation-error"
  | "rate-limited"
  | "service-error"
  | "success";

export type ContactMessageCode =
  | "none"
  | "validationError"
  | "rateLimited"
  | "serviceError"
  | "success";

export type ContactActionState = {
  status: ContactActionStatus;
  message: ContactMessageCode;
  fieldErrors?: Partial<Record<ContactField, ContactFieldErrorCode[]>>;
};

export const initialContactActionState: ContactActionState = {
  status: "idle",
  message: "none",
};

export type ContactSubmission = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: ContactService;
  message: string;
  privacy: true;
  locale: Locale;
  receivedAt: string;
};
