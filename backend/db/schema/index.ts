import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const mealPlanPreferencesSchema = z.object({
  peopleCount: z.number().min(1),
  weekStart: z.string(), // Day of the week to start meal plan
  // todo make this a number from 0 -> 7 (include suggestions for slight meal  variation e.g naan not rice)
  includeLeftovers: z.boolean().default(false), // Whether to include leftovers or have 7 new meals
});

export const mealPreferencesSchema = z.object({
  cuisines: z.array(
    z.enum(["indian", "vietnamese", "italian", "greek", "mexican"])
  ),
  allergies: z.array(z.enum(["peanuts", "eggs", "gluten", "soy", "dairy"])), // TODO: Add more()),
  spiceLevel: z.enum(["low", "medium", "high"]),
  dietary: z.array(
    z.enum(["vegetarian", "vegan", "kosher", "fodmap", "halal", "paleo"])
  ),
});

export const mealSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  cuisine: z.string(),
  category: z.array(z.string()), // e.g., ['dinner', 'vegetarian', 'quick']
  keyIngredients: z.array(z.string()), // For filtering by main ingredients
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const mealPlanSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  weekStartDate: z.date(),
  mealIds: z.array(
    z.object({
      day: z.string(),
      mealId: z.string().uuid(),
    })
  ),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
export type Meal = z.infer<typeof mealSchema>;
export type MealPlan = z.infer<typeof mealPlanSchema>;
export type MealPlanPreferences = z.infer<typeof mealPlanPreferencesSchema>;
export type MealPreferences = z.infer<typeof mealPreferencesSchema>;
