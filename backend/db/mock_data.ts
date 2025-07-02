import type { MealPlan, MealPreferences, User, Recipe } from "./schema";

export const TestUser: User = {
  id: "1",
  username: "oh hai",
  createdAt: new Date(),
};

export const TestMealPreferences: MealPreferences = {
  cuisines: [],
  allergies: ["dairy"],
  spiceLevel: "medium",
  dietary: [],
  peopleCount: 0,
  includeLeftovers: 0,
};

export const TestMealPlan: MealPlan = {
  id: "1",
  userId: "1",
  weekStartDate: new Date(),
  recipes: ["1", "2", "3"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const TestRecipe: Recipe = {
  id: "1",
  createdAt: new Date(),
  name: "Such a yummy meal",
  description: "",
  ingredients: [],
  instructions: [],
  prepTime: 0,
  cookTime: 0,
  servings: 0,
  difficulty: "medium",
  cuisine: "indian",
  // category: [],
  keyIngredients: [],
};
