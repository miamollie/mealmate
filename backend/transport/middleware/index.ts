// server/middleware/rateLimit.ts
import { redis } from "@/utils/redis";
import { initRateLimit } from "@upstash/ratelimit";
import { TRPCError } from "@trpc/server";

const ratelimit = initRateLimit({
  redis,
  limiter: [{ interval: "10s", limit: 5 }], // e.g., max 5 requests per 10s
  analytics: true,
});

export const rateLimitMiddleware = async (userId: string) => {
  const { success } = await ratelimit.limit(userId);
  if (!success) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "You're sending requests too quickly. Please slow down.",
    });
  }
};


// todo add auth middleware here too, move to own files
