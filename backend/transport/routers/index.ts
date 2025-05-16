/**
 * This file contains the root router of your tRPC-backend
 */
import type { ServicesType } from "../../services";
import { publicProcedure, router } from "../trpc";
import { userRouter } from "./user";

export const appRouter = (services: ServicesType) =>
  router({
    healthcheck: publicProcedure.query(() => "ok"),
    user: userRouter(services.userService), // routes related to user identity
    profile: publicProcedure.query(() => "ok"), // routes related to user profile/preferences for  meals
    mealPlan: publicProcedure.query(() => "ok"), // all routes realted to set of meals
    meal: publicProcedure.query(() => "ok"), // all routes realted to an individual
  });

export type AppRouter = ReturnType<typeof appRouter>;
