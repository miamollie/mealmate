/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meal } from "../schema";
import { TestMeal } from "../mock_data";
import type { DB } from "../init";

export class MealRepository {
  async findById(id: string): Promise<Meal> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return TestMeal;
  }

  // this is a users liked recipes
  async findAllForUser(db: DB, userId: string): Promise<Meal[]> { //todo type, LikedMeal - use DB types from supabase
    const { data, error } = await db
      .from("recipe_likes")
      .select("recipe_id, recipes(title)")
      .eq("user_id", userId)
      .join("recipes", "recipe_likes.recipe_id", "recipes.id");

    if (error) throw error;

    return data.map((row) => ({
      recipeId: row.recipe_id,
      title: row.recipes.title,
    }));
  }

  async create(user: Meal): Promise<Meal> {
    // const result = await ctx.db.query("INSERT INTO users SET ?", [user]);
    return TestMeal;
  }

  async update(id: string, user: Meal): Promise<Meal> {
    // const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
    //   user,
    //   id,
    // ]);
    return TestMeal;
  }
}
