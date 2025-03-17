
/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences, and calling the completion client

*/
// wrap openai client  in a completion service



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

 // Return generated meals without saving them?
const meals = JSON.parse(completion.choices[0].message.content).meals as Meal[];

 return {
   suggestedMeals: [TestMealPlan, TestMealPlan],
   userId: ctx.user.id,
 };

