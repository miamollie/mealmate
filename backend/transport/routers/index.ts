/**
 * This file contains the root router of your tRPC-backend
 */
import type { ServicesType } from "../../services";
import { publicProcedure, router } from "../trpc";
import { userRouter } from "./user";
import { mealPlanRouter } from "./mealPlan";
import { recipeRouter } from "./recipe";

export const appRouter = (services: ServicesType) =>
  router({
    healthcheck: publicProcedure.query(() => "ok"),
    user: userRouter(services.userService), // routes related to user identity including user profile/preferences for  meals
    mealPlan: mealPlanRouter(services.mealPlanService), // all routes realted to set of meals
    recipe: recipeRouter(services.recipeService), // all routes realted to an individual
  });

export type AppRouter = ReturnType<typeof appRouter>;
