import { z } from "zod";
import {
  DIFFICULTY,
  CUISINE,
  SPICE,
  ALLERGY,
  DIETARY,
  DAYCOUNT,
} from "../consts";

// Synced with supabase auth table
export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  createdAt: z.date(),
});

export const MealPreferencesSchema = z.object({
  cuisines: z.array(CUISINE),
  allergies: z.array(ALLERGY),
  spiceLevel: SPICE,
  dietary: z.array(DIETARY),
  peopleCount: z.number().min(1),
  includeLeftovers: DAYCOUNT, // Whether to include leftovers or have 7 new meals
});

export const notificationPreferencesSchema = z.object({
  // stuff like email, push notifications timestam, frequencies, paused
});

export const RecipeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()), // todo better format for ingredients
  instructions: z.array(z.string()), //todo ensure correct order...?
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  difficulty: DIFFICULTY,
  cuisine: CUISINE,
  keyIngredients: z.array(z.string()), // For filtering by main ingredients
  createdAt: z.date(),
  createdBy: z.enum(["user", "ai"]),
  createdFor: z.string().uuid(),
});

export const LikedRecipeSchema = RecipeSchema.pick({
  id: true,
  name: true,
});

export const recipeLikesSchema = z.object({
  recipeId: z.string().uuid(),
  userId: z.string().uuid(),
  likedAt: z.date(),
});

export const MealPlanSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  weekStartDate: z.date(),
  recipes: z.array(z.string().uuid()), //Infer 0th index as first meal of the week
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type LikedRecipe = z.infer<typeof LikedRecipeSchema>;
export type MealPlan = z.infer<typeof MealPlanSchema>;
export type MealPreferences = z.infer<typeof MealPreferencesSchema>;
