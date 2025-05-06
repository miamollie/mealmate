import type { User } from "../schema";
import type { DB } from "../../db/init";
import type { Context } from "../../transport/context";

export class UserRepository {
  async findById(ctx: Context, id: number): Promise<User> {
    const [user] = await ctx.db.query("SELECT * FROM users WHERE id = ?", [id]);
    return user;
  }

  async create(db: DB, user: User): Promise<any> {
    const result = await ctx.db.query("INSERT INTO users SET ?", [user]);
    return result;
  }

  async update(ctx: Context, id: number, user: User): Promise<any> {
    const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
      user,
      id,
    ]);
    return result;
  }

  async delete(ctx: Context, id: number): Promise<any> {
    const result = await ctx.db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}
