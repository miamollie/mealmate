import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { TestMealPlan } from "../../db/mock_data";

export const mealPlanRouter = router({
  // Get all saved plans with pagination
  getAll: protectedProcedure.query(async () => {
    return [TestMealPlan];
  }),
  // change a specific meal plan e.g add a new meal/replsace a meal (maybe be specific and call this replace meal? Edit plan..?)
  update: protectedProcedure
    .input(
      z.object({
        mealPlanId: z.string().uuid(),
        mealIndex: z.number(),
      })
    )
    .mutation(async () => {
      // move to mealplan service
      return TestMealPlan;
    }),
  // Get a specific saved plan by id
  getById: protectedProcedure
    .input(
      z.object({
        mealPlanId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      // move to mealplan service
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
  recommend: protectedProcedure.mutation(async () => {
    // move to recommendation service
    return TestMealPlan;
  }),
});
