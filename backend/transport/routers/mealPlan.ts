import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import type { MealPlanService } from "../../services/mealPlan";
import { TRPCError } from "@trpc/server";
import { DAYCOUNT } from "../../db/consts";

export const mealPlanRouter = (s: MealPlanService) =>
  router({
    // TODO introduce pagination, possibly expire older plans
    getAll: protectedProcedure.query(async ({ ctx }) => {
      const id = ctx.user.id;
      const user = await s.getAllForUser(ctx, id).catch((e) => {
        console.error(e);
        throw new TRPCError({
          message: e.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      });

      return {
        data: { user },
      };
    }),
    // todo extra diligent rate limiting required for create and replace, since they back onto the AI api
    replaceRecipe: protectedProcedure
      .input(
        z.object({
          mealPlanId: z.string().uuid(),
          recipeIndex: DAYCOUNT,
        })
      )
      .mutation(async ({ ctx, input }) => {
        return s.replaceRecipe(ctx, input.mealPlanId, input.recipeIndex);
      }),
    create: protectedProcedure.mutation(async ({ ctx }) => {
      return s.createForUser(ctx, ctx.user.id);
    }),
    getById: protectedProcedure
      .input(
        z.object({
          mealPlanId: z.string().uuid(),
        })
      )
      .query(async ({ ctx, input }) => {
        const mealPlan = await s.getById(ctx, input.mealPlanId).catch((e) => {
          console.error(e);
          throw new TRPCError({
            message: e.message,
            code: "INTERNAL_SERVER_ERROR",
          });
        });
        return mealPlan;
      }),
  });
