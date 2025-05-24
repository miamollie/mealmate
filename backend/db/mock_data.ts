import type {
  MealPlan,
  MealPlanPreferences,
  MealPreferences,
  User,
  Meal,
} from "./schema";

export const TestUser: User = {
  id: "1",
  email: "QcYK0@example.com",
  username: "oh hai",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const TestMealPlanPreferences: MealPlanPreferences = {
  peopleCount: 0,
  weekStart: "",
  includeLeftovers: false,
};

export const TestMealPreferences: MealPreferences = {
  cuisines: [],
  allergies: ["dairy"],
  spiceLevel: "medium",
  dietary: [],
};

export const TestMealPlan: MealPlan = {
  id: "1",
  userId: "1",
  weekStartDate: new Date(),
  mealIds: [
    {
      day: "MONDAY",
      mealId: "1",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const TestMeal: Meal = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Such a yummy meal",
  description: "",
  ingredients: [],
  instructions: [],
  prepTime: 0,
  cookTime: 0,
  servings: 0,
  difficulty: "medium",
  cuisine: "",
  category: [],
  keyIngredients: [],
};
