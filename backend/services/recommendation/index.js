"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences,
and calling the aiClient client then handling the response

*/
class RecommendationService {
    constructor(aiClient, userService, cache) {
        this.aiClient = aiClient;
        this.userService = userService;
        this.cache = cache;
        this.aiClient = aiClient;
        this.userService = userService;
        this.cache = cache;
    }
    async recommendMeals() {
        const preferencesMessage = await this.preferencesMessage();
        const systemMessage = {
            role: "system",
            content: `
You are a helpful and creative meal planning assistant. Your goal is to suggest balanced, nutritious meals that align with the user's dietary requirements and preferences. Ensure that meals are not overly repetitive based on recent plans, but also do not introduce entirely new recipes too often. Include familiar dishes alongside occasional new ideas.
`.trim(),
        };
        const messages = [
            systemMessage,
            preferencesMessage,
            {
                role: "user",
                content: `Can you plan my meals for the upcoming week? Please provide 7 recipes in JSON format. Each recipe should include:
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
          }`,
            },
        ];
        const resp = await this.aiClient.query(messages);
        // failure case for reaching cache? 
        const meals = this.cache.set(resp.choices[0].message.content);
        return meals;
    }
    async preferencesMessage() {
        const preferences = await this.userService.getUserPreferences();
        return `Generate a week of dinner recipes for ${preferences.TestMealPlanPreferences.peopleCount} people.
          Dietary preferences: ${preferences.TestMealPreferences.dietary.join(", ")}
          Allergies to avoid: ${preferences.TestMealPreferences.allergies.join(", ")}
          Preferred cuisines: ${preferences.TestMealPreferences.cuisines.join(", ")}
          Spice level: ${preferences.TestMealPreferences.spiceLevel}
`;
    }
}
exports.RecommendationService = RecommendationService;
