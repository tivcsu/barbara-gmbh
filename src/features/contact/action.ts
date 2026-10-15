"use server";

import { headers } from "next/headers";

import { processContactSubmission } from "./processor";
import type { ContactActionState } from "./types";

export async function submitContactForm(
  locale: string,
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const requestHeaders = await headers();
  return processContactSubmission(locale, formData, {
    clientIp: getClientIp(requestHeaders),
  });
}

function getClientIp(requestHeaders: Headers): string {
  const providerIp =
    requestHeaders.get("x-nf-client-connection-ip") ??
    requestHeaders.get("x-vercel-forwarded-for") ??
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-for");

  return providerIp?.split(",")[0]?.trim() || "unavailable";
}
