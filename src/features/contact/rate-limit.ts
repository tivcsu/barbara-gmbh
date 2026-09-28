import "server-only";

import { createHmac } from "node:crypto";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { getRateLimitConfig } from "./config";

type RateLimitScope = "ip" | "email";

let rateLimiters:
  | {
      ip: Ratelimit;
      email: Ratelimit;
      hashSecret: string;
    }
  | undefined;

function getRateLimiters() {
  if (rateLimiters) {
    return rateLimiters;
  }

  const config = getRateLimitConfig();
  const redis = new Redis({ url: config.url, token: config.token });

  rateLimiters = {
    ip: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "contact:ip",
      analytics: false,
      timeout: 1_500,
    }),
    email: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "contact:email",
      analytics: false,
      timeout: 1_500,
    }),
    hashSecret: config.hashSecret,
  };

  return rateLimiters;
}

export async function checkContactRateLimit(
  scope: RateLimitScope,
  identifier: string,
): Promise<boolean> {
  const limiters = getRateLimiters();
  const hashedIdentifier = createHmac("sha256", limiters.hashSecret)
    .update(identifier)
    .digest("hex");
  const result = await limiters[scope].limit(hashedIdentifier);

  if (result.reason === "timeout") {
    throw new Error("rate-limit-timeout");
  }

  await result.pending;
  return result.success;
}
