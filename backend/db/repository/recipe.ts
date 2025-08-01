import type { BaseRecipe, LikedRecipe, Recipe } from "../schema";
import { RecipeSchema, LikedRecipeSchema } from "../schema";
import type { DB } from "../init";
import { z } from "zod";

const RECIPE_TABLE = "recipe";
const RECIPE_LIKES_TABLE = "recipe_likes";
export class RecipeRepository {
  async getById(db: DB, id: string): Promise<Recipe | null> {
    const { data, error } = await db
      .from(RECIPE_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    const parsed = RecipeSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid recipe data", parsed.error);
      throw parsed.error;
    }

    return parsed.data;
  }

  async like(db: DB, recipeId: string, userId: string): Promise<void> {
    const { error } = await db
      .from(RECIPE_LIKES_TABLE)
      .insert({ recipe_id: recipeId, user_id: userId, liked_at: new Date() });

    if (error) throw error;
  }

  async getLikedForUser(db: DB, userId: string): Promise<LikedRecipe[]> {
    const { data, error } = await db
      .from(RECIPE_LIKES_TABLE)
      .select("recipes(name, id)")
      .eq("user_id", userId);

    if (error) throw error;

    const parsed = z.array(LikedRecipeSchema).safeParse(data);
    if (!parsed.success) {
      console.error("Invalid recipe data", parsed.error.flatten());
      throw new Error("Invalid liked recipe data");
    }

    return parsed.data;
  }

  async insertMany(db: DB, rs: BaseRecipe[]): Promise<Recipe[]> {
    const { data, error } = await db
      .from(RECIPE_TABLE)
      .insert(rs)
      .select()
      .single();

    if (error) throw error;

    const parsed = z.array(RecipeSchema).safeParse(data);
    if (!parsed.success) {
      console.error("Invalid recipe data", parsed.error.flatten());
      throw new Error("Invalid recipe data");
    }
    return parsed.data;
  }

  async insert(db: DB, rs: BaseRecipe): Promise<Recipe> {
    const { data, error } = await db
      .from(RECIPE_TABLE)
      .insert(rs)
      .select()
      .single();

    if (error) throw error;

    const parsed = RecipeSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid recipe data", parsed.error.flatten());
      throw new Error("Invalid recipe data");
    }
    return parsed.data;
  }
}
