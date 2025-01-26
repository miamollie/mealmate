import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  peopleCount: z.number().min(1),
  dietaryPreferences: z.array(z.string()),
  allergies: z.array(z.string()),
  cuisinePreferences: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
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
  difficulty: z.enum(['easy', 'medium', 'hard']),
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
  mealIds: z.array(z.object({
    day: z.string(),
    mealId: z.string().uuid(),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
export type Meal = z.infer<typeof mealSchema>;
export type MealPlan = z.infer<typeof mealPlanSchema>;