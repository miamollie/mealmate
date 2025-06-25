import type { UserRepository } from "../../db/repository/user";
import type { MealPreferences, User } from "../../db/schema";
import type { Context } from "../../transport/context";

export type UserServiceType = {
  findById(ctx: Context, id: string): Promise<User>;
  updatePreferences(
    ctx: Context,
    id: string,
    preferences: MealPreferences
  ): Promise<MealPreferences>;
  getPreferences(): Promise<MealPreferences>;
};

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
    // at the service layer, we ensure no overwrites - this is business logic
    // at the repo layer we do the actual change
    return this.userRepository.upsertUserPreferences(ctx.db, id, preferences);
  }
  async getPreferences(ctx: Context, id: string) {
    return this.userRepository.getUserPreferences(ctx.db, id);
  }
}
