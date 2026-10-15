import "server-only";

import { routing, type Locale } from "@/src/i18n/routing";

import { ContactConfigurationError } from "./config";
import { ContactEmailError, sendContactEmail } from "./email";
import { checkContactRateLimit } from "./rate-limit";
import {
  getFormString,
  mapContactFieldErrors,
  validateContactForm,
} from "./schema";
import type { ContactActionState, ContactSubmission } from "./types";

export type ContactDependencies = {
  checkRateLimit: (
    scope: "ip" | "email",
    identifier: string,
  ) => Promise<boolean>;
  sendEmail: (submission: ContactSubmission) => Promise<void>;
  now: () => Date;
};

type ProcessContactOptions = {
  clientIp: string;
  dependencies?: ContactDependencies;
};

const productionDependencies: ContactDependencies = {
  checkRateLimit: checkContactRateLimit,
  sendEmail: sendContactEmail,
  now: () => new Date(),
};

export async function processContactSubmission(
  locale: string,
  formData: FormData,
  options: ProcessContactOptions,
): Promise<ContactActionState> {
  if (!isLocale(locale)) {
    return serviceError();
  }

  if (getFormString(formData, "website").trim()) {
    return success();
  }

  const dependencies = options.dependencies ?? productionDependencies;

  try {
    const ipAllowed = await dependencies.checkRateLimit("ip", options.clientIp);
    if (!ipAllowed) {
      return rateLimited();
    }
  } catch (error) {
    logContactFailure("rate-limit-unavailable", error);
    return serviceError();
  }

  const validated = validateContactForm(formData);
  if (!validated.success) {
    return {
      status: "validation-error",
      message: "validationError",
      fieldErrors: mapContactFieldErrors(validated.error),
    };
  }

  try {
    const emailAllowed = await dependencies.checkRateLimit(
      "email",
      validated.data.email,
    );
    if (!emailAllowed) {
      return rateLimited();
    }

    await dependencies.sendEmail({
      ...validated.data,
      locale,
      receivedAt: dependencies.now().toISOString(),
    });
  } catch (error) {
    logContactFailure(getFailureEvent(error), error);
    return serviceError();
  }

  return success();
}

function isLocale(value: string): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

function success(): ContactActionState {
  return { status: "success", message: "success" };
}

function rateLimited(): ContactActionState {
  return { status: "rate-limited", message: "rateLimited" };
}

function serviceError(): ContactActionState {
  return { status: "service-error", message: "serviceError" };
}

function getFailureEvent(error: unknown): string {
  if (error instanceof ContactConfigurationError) {
    return `configuration-${error.scope}`;
  }
  if (error instanceof ContactEmailError) {
    return "email-provider-rejected";
  }
  return "submission-failed";
}

function logContactFailure(event: string, error: unknown): void {
  const providerCode =
    error instanceof ContactEmailError ? error.providerCode : "unknown";
  console.error(`[contact-form] ${event} (${providerCode})`);
}
