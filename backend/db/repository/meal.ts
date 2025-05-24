/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meal } from "../schema";
import type { Context } from "../../transport/context";
import { TestMeal } from "../mock_data";

export class MealRepository {
  async findById(id: string): Promise<Meal> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return TestMeal;
  }

  async findAllForUser(userId: string): Promise<Meal[]> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return [TestMeal];
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
