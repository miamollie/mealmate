import { MealPlanSchema, type MealPlan } from "../schema";
import type { DB } from "../init";
import { z } from "zod";

const MEAL_PLANS_TABLE = "meal_plans";

export class MealPlanRepository {
  async getById(db: DB, id: string): Promise<MealPlan> {
    const { data, error } = await db
      .from(MEAL_PLANS_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    const parsed = MealPlanSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid meal plan data", parsed.error.flatten());
      throw new Error("Invalid meal plan data");
    }
    return parsed.data;
  }

  async getAllForUser(db: DB, userId: string): Promise<MealPlan[]> {
    const { data, error } = await db
      .from(MEAL_PLANS_TABLE)
      .select("*")
      .eq("userId", userId)
      .single();
    //todo join on recipes table to get titles back too

    if (error) {
      throw error;
    }

    const parsed = z.array(MealPlanSchema).safeParse(data);
    if (!parsed.success) {
      console.error("Invalid meal plan data", parsed.error.flatten());
      throw new Error("Invalid meal plan data");
    }
    return parsed.data;
  }

  async insert(db: DB, m: Partial<MealPlan>): Promise<MealPlan>{
    const { data, error } = await db
      .from(MEAL_PLANS_TABLE)
      .insert(m)
      .select()
      .single();

    if (error) {
      throw error;
    }

    const parsed = MealPlanSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid meal plan data", parsed.error.flatten());
      throw new Error("Invalid meal plan data");
    }
    return parsed.data;
  }

  async update(
    db: DB,
    id: string,
    changeset: Partial<MealPlan>
  ): Promise<MealPlan> {
    const { data, error } = await db
      .from(MEAL_PLANS_TABLE)
      .update(changeset)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    const parsed = MealPlanSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid meal plan data", parsed.error.flatten());
      throw new Error("Invalid meal plan data");
    }
    return parsed.data;
  }
}
