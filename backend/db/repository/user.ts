/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MealPreferences } from "../schema";
import { MealPreferencesSchema, UserSchema, type User } from "../schema";
import { TestUser } from "../mock_data";
import type { DB } from "../init";

// note - types from db schema instead?

export class UserRepository {
  async findById(db: DB, id: string): Promise<User | null> {
    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getById error:", error);
      return null;
    }

    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      return null;
    }

    return data as User;
  }

  async upsertUserPreferences(
    db: DB,
    id: string,
    preferences: MealPreferences
  ): Promise<MealPreferences | null> {
    const { data, error } = await db
      .from("meal_preferences")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getUserPreferences error:", error);
      return null;
    }

    const parsed = MealPreferencesSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      return null;
    }

    return parsed;
  }

  async getUserPreferences(
    db: DB,
    id: string
  ): Promise<MealPreferences | null> {
    const { data, error } = await db
      .from("meal_preferences")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getUserPreferences error:", error);
      return null;
    }

    const parsed = MealPreferencesSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      return null;
    }

    return parsed;
  }

  async delete(id: string): Promise<null> {
    // const result = await ctx.db.query("DELETE FROM users WHERE id = ?", [id]);
    return null;
  }
}
