import { z } from "zod";
import { protectedProcedure, router } from "@backend/transport/trpc";
import { TRPCError } from "@trpc/server";
import { DAYCOUNT } from "@backend/db/consts";
import type { MealPlanService } from "@backend/services/mealplan";

export const mealPlanRouter = (s: MealPlanService) =>
  router({
    getAll: protectedProcedure
      .input(
        z
          .object({
            page: z.number().min(1).default(1),
            limit: z.number().min(1).max(50).default(10),
          })
          .optional()
      )
      .query(async ({ ctx, input }) => {
        const { page = 1, limit = 10 } = input || {};
        const id = ctx.user.id;
        const result = await s
          .getAllForUser(ctx, id, { page, limit })
          .catch((e) => {
            console.error(e);
            throw new TRPCError({
              message: e.message,
              code: "INTERNAL_SERVER_ERROR",
            });
          });

        return result;
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
