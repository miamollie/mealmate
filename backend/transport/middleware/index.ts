import rateLimit from "express-rate-limit";
import { TRPCError } from "@trpc/server";

export const ratelimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: "You have exceeded the 100 requests in 24 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

//@ts-ignore
export const isAuthenticated = ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      ...ctx,
      // Infers the `user` as non-nullable
      user: ctx.user,
    },
  });
};
