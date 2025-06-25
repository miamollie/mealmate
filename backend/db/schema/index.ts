import { z } from "zod";

// Synced with supabase auth table
export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  createdAt: z.date(),
});

const DAYCOUNT = z.number().min(0).max(7).default(0);
const CUISINE = z.enum(["indian", "vietnamese", "italian", "greek", "mexican"]);
const SPICE = z.enum(["low", "medium", "high"]);
const ALLERGY = z.enum(["peanuts", "eggs", "gluten", "soy", "dairy"]);
const DIETARY = z.enum([
  "vegetarian",
  "vegan",
  "kosher",
  "fodmap",
  "halal",
  "paleo",
]);
const DIFFICULTY = z.enum(["easy", "medium", "hard"]);

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
  lastUsedAt: z.date().optional(), // TODO: Should this be optional?
});

export const recipeSchema = RecipeSchema; // draft recipes are recommended recipes that have not be liked
export const draftRecipeSchema = RecipeSchema; //

export const recipeLikesSchema = z.object({
  recipeId: z.string().uuid(),
  userId: z.string().uuid(),
  likedAt: z.date(),
});

// const thing = RecipeSchema.extend({});

export const MealPlanSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  weekStartDate: z.date(),
  recipes: z.array(z.string().uuid()), //Infer 0th index as first meal of the week
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const recommendationSchema = z.object({
  id: z.string().uuid(), //use uuid as cache key
  meals: z.array(RecipeSchema).max(7), //todo can you do zod.pick like a TS type?
});

export type User = z.infer<typeof UserSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type MealPlan = z.infer<typeof MealPlanSchema>;
export type MealPreferences = z.infer<typeof MealPreferencesSchema>;
export type RecommendationSchema = z.infer<typeof recommendationSchema>;
