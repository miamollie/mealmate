/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure,protectedProcedure, router } from '../trpc';
import { userRouter } from './user';

// All but the healthcheck should be "protected"
// user, profile and some others should be " is me " routes; isUserOwner?. 
// Or "protected" is good enough, and you always get the userID from contexrt
export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'ok'),
  user: userRouter,
  profile:  publicProcedure.query(() => 'ok'),  
  mealPlan: publicProcedure.query(() => 'ok'),
  whoami: protectedProcedure.mutation(async (opts) => {
    // user is non-nullable here
    const { ctx } = opts;
            
    return ctx.user;
  }),
});

export type AppRouter = typeof appRouter;