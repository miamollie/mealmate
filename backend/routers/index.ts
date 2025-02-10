/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, protectedProcedure, router } from "../trpc";
import { recommendationRouter } from "./recommendations";
import { userRouter } from "./user";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  recommend: recommendationRouter,
  user: userRouter,
  profile: publicProcedure.query(() => "ok"),
  mealPlan: publicProcedure.query(() => "ok"),
  whoami: protectedProcedure.mutation(async (opts) => {
    // user is non-nullable here
    const { ctx } = opts;

    return ctx.user;
  }),
});

export type AppRouter = typeof appRouter;
