/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MealPlan } from "../schema";
import type { Context } from "../../transport/context";
import { TestMealPlan } from "../mock_data";

export class MealPlanRepository {
  async findById(id: string): Promise<MealPlan> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return TestMealPlan;
  }

  async findByAllForUser(userId: string): Promise<MealPlan[]> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return [TestMealPlan];
  }

  async create(user: MealPlan): Promise<MealPlan> {
    // const result = await ctx.db.query("INSERT INTO users SET ?", [user]);
    return TestMealPlan;
  }

  async update(id: string, user: MealPlan): Promise<MealPlan> {
    // const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
    //   user,
    //   id,
    // ]);
    return TestMealPlan;
  }
}
