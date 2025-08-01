import type { Context } from "@backend/transport/context";
import type { UserService } from "@backend/services/user";
import type { AIClient } from "@backend/clients/ai";
import type { EasyInputMessage } from "openai/resources/responses/responses";
import { z } from "zod";
import type { MealPreferences } from "@backend/db/schema";
import { RecipeSchema } from "@backend/db/schema";

/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences, 
and calling the aiClient client then handling the response

*/

const GeneratedRecipeSchema = RecipeSchema.pick({
  ingredients: true,
  servings: true,
  // ...etc
});

const GeneratedMealPlanSchema = z.array(GeneratedRecipeSchema).max(7);

export type GeneratedRecipe = z.infer<typeof GeneratedRecipeSchema>;
export type GeneratedMealPlan = z.infer<typeof GeneratedMealPlanSchema>;

export class RecommendationService {
  constructor(
    private aiClient: AIClient,
    private userService: UserService
  ) {
    this.aiClient = aiClient;
    this.userService = userService;
  }

  //todo how to perform regression testing over system message
  private systemPrompt: EasyInputMessage = {
    role: "system",
    content: `
You are a helpful and creative meal planning assistant. Your goal is to suggest balanced, nutritious meals that align with the user's dietary requirements and preferences. Ensure that meals are not overly repetitive based on recent plans, but also do not introduce entirely new recipes too often. Include familiar dishes alongside occasional new ideas.
`.trim(),
  };
  private userPrompt: EasyInputMessage = {
    role: "user",
    content: `
Can you plan my meals for the upcoming week? Please provide 7 recipes in JSON format. Each recipe should include.
`.trim(),
  };

  async generateRecipes(ctx: Context, userId: string) {
    const preferences = await this.userService
      .getPreferences(ctx, userId)
      .catch(() => {
        throw new Error("Failed to fetch user preferences");
      });

    if (!preferences) {
      throw new Error("Failed to fetch user preferences");
    }
    const preferencesPrompt = await this.preferencesPrompt(preferences);

    const messages: EasyInputMessage[] = [
      this.systemPrompt,
      preferencesPrompt,
      this.userPrompt,
    ];
    // Split MealPlanSchema and MealPlanRecommendation
    const recommendation = await this.aiClient.query(
      messages,
      GeneratedMealPlanSchema
    );

    if (!recommendation) {
      throw new Error("Failed to generate recommendation");
    }

    return GeneratedMealPlanSchema.parse(recommendation);
  }

  async generateRecipe(ctx: Context, userId: string) {
    const preferences = await this.userService
      .getPreferences(ctx, userId)
      .catch(() => {
        throw new Error("Failed to fetch user preferences");
      });

    if (!preferences) {
      throw new Error("Failed to fetch user preferences");
    }
    const preferencesPrompt = await this.preferencesPrompt(preferences);

    const messages: EasyInputMessage[] = [
      this.systemPrompt,
      preferencesPrompt,
      this.userPrompt,
    ];
    // Split MealPlanSchema and MealPlanRecommendation
    const recommendation = await this.aiClient.query(
      messages,
      GeneratedRecipeSchema
    );

    if (!recommendation) {
      throw new Error("Failed to generate recommendation");
    }

    return GeneratedRecipeSchema.parse(recommendation);
  }

  private async preferencesPrompt(
    preferences: MealPreferences
  ): Promise<EasyInputMessage> {
    return {
      role: "user",
      content: `Ensure recipe is suitable for ${preferences.peopleCount} people.
          Dietary preferences: ${preferences.dietary.join(", ")}
          Allergies to avoid: ${preferences.allergies.join(", ")}
          Preferred cuisines: ${preferences.cuisines.join(", ")}
          Spice level: ${preferences.spiceLevel}
          Include leftovers: ${preferences.includeLeftovers}`.trim(),
    };
  }
}
