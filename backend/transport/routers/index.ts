/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, protectedProcedure, router } from "../trpc";
import { userRouter } from "./user";
// accept services and pass to routes
export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  user: userRouter, // routes related to user identity
  profile: publicProcedure.query(() => "ok"), // routes related to user profile/preferences for  meals
  mealPlan: publicProcedure.query(() => "ok"), // all routes realted to set of meals
  meal: publicProcedure.query(() => "ok"), // all routes realted to an individual
  whoami: protectedProcedure.mutation(async (opts) => {
    // example route
    // user is non-nullable here
    const { ctx } = opts;

    return ctx.user;
  }),
});

export type AppRouter = typeof appRouter;
