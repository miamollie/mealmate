/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences, 
and calling the aiClient client then handling the response

*/
export class RecommendationService {
  constructor(
    private aiClient: any,
    private userService: any,
    private cache: any
  ) {
    this.aiClient = aiClient;
    this.userService = userService;
    this.cache = cache;
  }

  async recommendMeals() {
    const prompt = await this.createPrompt();

    const resp = await this.aiClient.query(prompt);

    // mesls service parse format response?, and save to db?
    // no! save it to the cache, then only create on accept
    const meals = this.cache.set(resp.choices[0].message.content);

    return meals;
  }
  private async createPrompt() {
    const preferences = await this.userService.getUserPreferences();

    return `Generate a week of dinner recipes for ${preferences.TestMealPlanPreferences.peopleCount} people.
          Dietary preferences: ${preferences.TestMealPreferences.dietary.join(", ")}
          Allergies to avoid: ${preferences.TestMealPreferences.allergies.join(", ")}
          Preferred cuisines: ${preferences.TestMealPreferences.cuisines.join(", ")}
          Spice level: ${preferences.TestMealPreferences.spiceLevel}

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
  }
}
