import type { MealPreferences } from "../schema";
import { MealPreferencesSchema, UserSchema, type User } from "../schema";
import type { DB } from "../init";

const MEAL_PREFERENCES_TABLE = "meal_preferences";
const USER_TABLE = "user";
export class UserRepository {
  async getById(db: DB, id: string): Promise<User | null> {
    const { data, error } = await db
      .from(USER_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getById error:", error);
      throw new Error("Failed to BLAH: " + error.message);
    }

    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      throw new Error("Failed to BLAH: " + parsed.error);
    }

    return UserSchema.parse(data);
  }

  async upsertUserPreferences(
    db: DB,
    id: string,
    preferences: Partial<MealPreferences>
  ): Promise<MealPreferences | null> {
    const { data, error } = await db
      .from(MEAL_PREFERENCES_TABLE)
      .upsert(preferences)
      .eq("id", id);

    if (error) {
      console.error("upsertUserPreferences error:", error);
      throw new Error("Failed to BLAH: " + error.message);
    }

    const parsed = MealPreferencesSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      throw new Error("Failed to unmarshal user preferences: " + parsed.error);
    }

    return MealPreferencesSchema.parse(data);
  }

  async getUserPreferences(
    db: DB,
    id: string
  ): Promise<MealPreferences | null> {
    const { data, error } = await db
      .from(MEAL_PREFERENCES_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getUserPreferences error:", error);
      throw new Error("Failed to get user prefere: " + error.message);
    }

    const parsed = MealPreferencesSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      throw new Error("Failed to get unmarshal user preferences: " + parsed.error);
    }

    return MealPreferencesSchema.parse(data);
  }

  async delete(db: DB, id: string): Promise<User | null> {
    const { data, error } = await db
      .from(USER_TABLE)
      .update("deleted = true")
      .eq("id", id)
      .select();

    if (error) {
      console.error("getById error:", error);
      throw new Error("Failed to BLAH: " + error.message);
    }

    const parsed = UserSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid user data", parsed.error);
      throw new Error("Failed to BLAH: " + parsed.error);
    }

    return UserSchema.parse(data);
  }
}
