import type { Context } from "@backend/transport/context";
import type { UserService } from "@backend/services/user";
import type { AIClient } from "@backend/clients/ai";
import type { MealPreferences } from "@backend/db/schema";
import { MealPlanSchema } from "@backend/db/schema";

/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences, 
and calling the aiClient client then handling the response

*/
export class RecommendationService {
  constructor(
    private aiClient: AIClient,
    private userService: UserService,
    private recipeService: RecipeService,
    private mealPlanService: MealPlanService
  ) {
    this.aiClient = aiClient;
    this.userService = userService;
    this.recipeService = recipeService;
    this.mealPlanService = mealPlanService;
  }

  //todo how to perform regression testing over system message
  private systemMessage = {
    role: "system",
    content: `
You are a helpful and creative meal planning assistant. Your goal is to suggest balanced, nutritious meals that align with the user's dietary requirements and preferences. Ensure that meals are not overly repetitive based on recent plans, but also do not introduce entirely new recipes too often. Include familiar dishes alongside occasional new ideas.
`.trim(),
  };
  private userPrompt = {
    role: "user",
    content: `
YCan you plan my meals for the upcoming week? Please provide 7 recipes in JSON format. Each recipe should include.
`.trim(),
  };

  async recommendMeals(ctx: Context, userId: string) {
    const preferencesMessage = await this.preferencesMessage(ctx, userId);

    const messages = [this.systemMessage, preferencesMessage, this.userPrompt];

    const recommendation = await this.aiClient.query(messages, MealPlanSchema);

    await this.recipeService.createDrafts(recommendation.meals).catch((e) => {
      throw new Error("Failed to blah: " + e.message);
    });
    await this.mealPlanService
      .createForUser(ctx, userId, recommendation)
      .catch((e) => {
        throw new Error("Failed to blah: " + e.message);
      });

    return recommendation;
  }
  private async preferencesMessage(ctx: Context, userId: string) {
    let preferences = await this.userService.getPreferences(ctx, userId);

    if (!preferences) {
      preferences = DEFAULT_PREFERENCES;
      console.log("No preferences found for user", userId);
    }

    return `Generate a week of dinner recipes for ${preferences.peopleCount} people.
          Dietary preferences: ${preferences.dietary.join(", ")}
          Allergies to avoid: ${preferences.allergies.join(", ")}
          Preferred cuisines: ${preferences.cuisines.join(", ")}
          Spice level: ${preferences.spiceLevel}
`;
  }
}

const DEFAULT_PREFERENCES: MealPreferences = {
  peopleCount: 2,
  dietary: [""],
  allergies: [],
  cuisines: [""],
  spiceLevel: "medium",
  includeLeftovers: 0,
};
