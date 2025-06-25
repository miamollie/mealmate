import type { MealPreferences } from "../schema";
import { MealPreferencesSchema, UserSchema, type User } from "../schema";
import type { DB } from "../init";

export class UserRepository {
  async findById(db: DB, id: string): Promise<User | null> {
    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("findById error:", error);
      return null;
    }

    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      return null;
    }

    return UserSchema.parse(data);
  }

  async upsertUserPreferences(
    db: DB,
    id: string,
    preferences: MealPreferences
  ): Promise<MealPreferences | null> {
    const { data, error } = await db
      .from("meal_preferences")
      .upsert(preferences)
      .eq("id", id);

    if (error) {
      console.error("upsertUserPreferences error:", error);
      return null;
    }

    const parsed = MealPreferencesSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      return null;
    }

    return MealPreferencesSchema.parse(data);
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

    return MealPreferencesSchema.parse(data);
  }

  async delete(db: DB, id: string): Promise<User | null> {
    const { data, error } = await db
      .from("users")
      .update("deleted = true")
      .eq("id", id)
      .select();

    if (error) {
      console.error("getById error:", error);
      return null;
    }

    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      return null;
    }

    return UserSchema.parse(data);
  }
}
