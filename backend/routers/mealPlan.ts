import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const mealPlanRouter = router({
  getMealPlan: protectedProcedure
    .input(
      z.object({
        mealPlanId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { data: mealPlan } = await ctx.db
        .from("meal_plans")
        .select("*, meals(*)")
        .eq("id", input.mealPlanId)
        .single();

      if (!mealPlan) {
        throw new Error("Meal plan not found");
      }

      return mealPlan;
    }),
});
