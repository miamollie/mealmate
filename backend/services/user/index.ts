import type { UserRepository } from "../../db/repository/user";
import type { MealPreferences } from "../../db/schema";
import type { Context } from "../../transport/context";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findById(ctx: Context, id: string) {
    // handle an error
    return this.userRepository.findById(ctx.db, id);
  }

  async updatePreferences(
    ctx: Context,
    id: string,
    preferences: MealPreferences
  ) {
    // TODO ensure updates don't overwrite other existing preferences
    return this.userRepository.upsertUserPreferences(ctx.db, id, preferences);
  }
  async getPreferences(ctx: Context, id: string) {
    // handle an error

    return this.userRepository.getUserPreferences(ctx.db, id);
  }
}
