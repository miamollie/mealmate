"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const schema_1 = require("../schema");
const mock_data_1 = require("../mock_data");
// note - types from db schema instead?
class UserRepository {
    async findById(db, id) {
        const { data, error } = await db
            .from("users")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error("getById error:", error);
            return null;
        }
        const parsed = schema_1.UserSchema.safeParse(data);
        if (!parsed.success) {
            console.error("Invalid user data", parsed.error);
            return null;
        }
        return data;
    }
    async create(user) {
        // const result = await ctx.db.query("INSERT INTO users SET ?", [user]);
        return mock_data_1.TestUser;
    }
    async update(id, user) {
        // const result = await ctx.db.query("UPDATE users SET ? WHERE id = ?", [
        //   user,
        //   id,
        // ]);
        return mock_data_1.TestUser;
    }
    async delete(id) {
        // const result = await ctx.db.query("DELETE FROM users WHERE id = ?", [id]);
        return null;
    }
}
exports.UserRepository = UserRepository;
