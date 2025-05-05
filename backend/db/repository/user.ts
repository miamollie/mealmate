import type { User } from "../schema";

export class UserRepository {
  async findById(db: any, id: number): Promise<User> {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return user;
  }

  async create(db: any, user: any): Promise<any> {
    const result = await db.query("INSERT INTO users SET ?", [user]);
    return result;
  }

  async update(db: any, id: number, user: any): Promise<any> {
    const result = await db.query("UPDATE users SET ? WHERE id = ?", [
      user,
      id,
    ]);
    return result;
  }

  async delete(db: any, id: number): Promise<any> {
    const result = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}
