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

  async getAllForUser(
    db: DB, 
    userId: string,
    options?: { page?: number; limit?: number }
  ): Promise<{ data: MealPlan[]; pagination: { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean } }> {
    const { page = 1, limit = 10 } = options || {};
    const offset = (page - 1) * limit;

    // Get total count
    const { count, error: countError } = await db
      .from(MEAL_PLANS_TABLE)
      .select("*", { count: "exact", head: true })
      .eq("userId", userId);

    if (countError) {
      throw countError;
    }

    // Get paginated data
    const { data, error } = await db
      .from(MEAL_PLANS_TABLE)
      .select("*")
      .eq("userId", userId)
      .order("createdAt", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const parsed = z.array(MealPlanSchema).safeParse(data);
    if (!parsed.success) {
      console.error("Invalid meal plan data", parsed.error.flatten());
      throw new Error("Invalid meal plan data");
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: parsed.data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
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
