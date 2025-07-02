import type { Recipe } from "../schema";
import { TestRecipe } from "../mock_data";
import type { DB } from "../init";

export class RecipeRepository {
  async findById(db: DB, id: string): Promise<Recipe> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return TestRecipe;
  }

  // this is a users liked recipes
  async findAllForUser(db: DB, userId: string): Promise<Recipe[]> {
    //todo type, LikedRecipe - use DB types from supabase
    const { data, error } = await db
      .from("recipe_likes")
      .select("recipe_id, recipes(title)")
      .eq("user_id", userId);

    if (error) throw error;

    return data.map((row) => ({
      recipeId: row.recipe_id,
      title: row.recipes.title,
    }));
  }

  async create(db: DB, r: Recipe): Promise<Recipe> {
    const { data, error } = await db
      .from("recipes")
      .insert(r)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(id: string, user: Recipe): Promise<Recipe> {
    // const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
    //   user,
    //   id,
    // ]);
    return TestRecipe;
  }
}
