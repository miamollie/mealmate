import { protectedProcedure, router } from "../trpc";
import {
  TestMealPlan,
  TestMealPlanPreferences,
  TestMealPreferences,
} from "../../mock_data";
import type { Meal } from "~/db/schema";

export const recommendationRouter = router({
  createMealRecommendation: protectedProcedure.mutation(async ({ ctx }) => {
    const prompt = `Generate a week of dinner recipes for ${TestMealPlanPreferences.peopleCount} people.
          Dietary preferences: ${TestMealPreferences.dietary.join(", ")}
          Allergies to avoid: ${TestMealPreferences.allergies.join(", ")}
          Preferred cuisines: ${TestMealPreferences.cuisines.join(", ")}
          Spice level: ${TestMealPreferences.spiceLevel}

          Please provide 7 recipes in JSON format. Each recipe should include:
          {
            name: string,
            description: string,
            ingredients: string[],
            instructions: string[],
            prepTime: number (in minutes),
            cookTime: number (in minutes),
            servings: number,
            difficulty: "easy" | "medium" | "hard",
            cuisine: string,
            category: string[],
            keyIngredients: string[]
          }`;

    // Return generated meals without saving them
    return {
      suggestedMeals: [TestMealPlan, TestMealPlan],
      userId: ctx.user.id,
    };
  }),
});

// export prompt into testable function inside recommendation service
