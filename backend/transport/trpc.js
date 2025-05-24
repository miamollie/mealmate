"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = server_1.initTRPC.context().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
exports.router = t.router;
/**
 * Public procedure, unprotected by auth
 */
exports.publicProcedure = t.procedure;
/**
 * Protected procedure: uses tRPC's "use" method, a middleware helper, to protect a procedure
 */
exports.protectedProcedure = t.procedure.use(function isAuthed(opts) {
    if (!opts.ctx.user) {
        throw new server_1.TRPCError({
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
