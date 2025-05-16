import type { User } from "../schema";
import type { Context } from "../../transport/context";
import { TestUser } from "../mock_data";

export class UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(ctx: Context, id: string): Promise<User> {
    // const [user] = await ctx.db.queTestUserry("SELECT * FROM users WHERE id = ?", [id]);
    return TestUser;
  }

  async create(ctx: Context, user: User): Promise<any> {
    const result = await ctx.db.query("INSERT INTO users SET ?", [user]);
    return result;
  }

  async update(ctx: Context, id: string, user: User): Promise<any> {
    const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
      user,
      id,
    ]);
    return result;
  }

  async delete(ctx: Context, id: string): Promise<any> {
    const result = await ctx.db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}
