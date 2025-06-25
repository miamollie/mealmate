/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences, 
and calling the aiClient client then handling the response

*/
export class RecommendationService {
  constructor(
    private aiClient: any,
    private userService: any
  ) {
    this.aiClient = aiClient;
    this.userService = userService;
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


  async recommendMeals() {
    const preferencesMessage = await this.preferencesMessage();

    const messages = [this.systemMessage, preferencesMessage, this.userPrompt];

    const resp = await this.aiClient.query(messages);

    // handle errors

    const meals = resp.output_parsed;
    //Forget about the cache, this will more likely be running on a cron. Instead we can purge the recipes
    // table periodically and keep track of liked recipes serperately so they aren't dropped e.g promote recipe to "liked_recipe" table
    // also have "recipe_likes" as users who like certain recipes
    // the bloated table can be like... draft_recipe maybe

    return meals;
  }
  private async preferencesMessage() {
    const preferences = await this.userService.getUserPreferences();

    return `Generate a week of dinner recipes for ${preferences.TestMealPlanPreferences.peopleCount} people.
          Dietary preferences: ${preferences.TestMealPreferences.dietary.join(", ")}
          Allergies to avoid: ${preferences.TestMealPreferences.allergies.join(", ")}
          Preferred cuisines: ${preferences.TestMealPreferences.cuisines.join(", ")}
          Spice level: ${preferences.TestMealPreferences.spiceLevel}
`;
  }
}
