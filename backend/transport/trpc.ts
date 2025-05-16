import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

/**
 * Public procedure, unprotected by auth
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure: uses tRPC's "use" method, a middleware helper, to protect a procedure
 */
export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      // Infers the `user` as non-nullable
      user: opts.ctx.user,
    },
  });
});
