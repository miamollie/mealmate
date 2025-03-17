import type {
  MealPlan,
  MealPlanPreferences,
  MealPreferences,
  User,
} from "./db/schema";

export const TestUser: User = {
  id: "1",
  email: "QcYK0@example.com",
  username: "",
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
  mealIds: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
