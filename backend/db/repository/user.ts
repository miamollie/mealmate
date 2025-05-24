/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserSchema, type User } from "../schema";
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

  async create(user: User): Promise<User> {
    // const result = await ctx.db.query("INSERT INTO users SET ?", [user]);
    return TestUser;
  }

  async update(id: string, user: User): Promise<User> {
    // const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
    //   user,
    //   id,
    // ]);
    return TestUser;
  }

  async delete(id: string): Promise<null> {
    // const result = await ctx.db.query("DELETE FROM users WHERE id = ?", [id]);
    return null;
  }
}
