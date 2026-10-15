import "server-only";

import { z } from "zod";

export class ContactConfigurationError extends Error {
  constructor(readonly scope: "email" | "rate-limit") {
    super(`Contact ${scope} configuration is unavailable.`);
    this.name = "ContactConfigurationError";
  }
}

const emailConfigSchema = z.object({
  apiKey: z.string().min(1),
  from: z.string().min(3),
  to: z.string().email(),
});

const rateLimitConfigSchema = z.object({
  url: z.string().url(),
  token: z.string().min(1),
  hashSecret: z.string().min(32),
});

export function getEmailConfig() {
  const result = emailConfigSchema.safeParse({
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  });

  if (!result.success) {
    throw new ContactConfigurationError("email");
  }

  return result.data;
}

export function getRateLimitConfig() {
  const result = rateLimitConfigSchema.safeParse({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    hashSecret: process.env.RATE_LIMIT_HASH_SECRET,
  });
  if (!result.success) {
    throw new ContactConfigurationError("rate-limit");
  }

  return result.data;
}
