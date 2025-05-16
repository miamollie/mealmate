import {
  TestMealPlanPreferences,
  TestMealPreferences,
} from "../../db/mock_data";
import type { UserRepository } from "../../db/repository/user";
import type { User } from "../../db/schema";
import type { Context } from "../../transport/context";

export type UserServiceType = {
  findById(ctx: Context, id: string): Promise<User | null>;
  // create(user: User): Promise<User>;
  // update(id: number, user: User): Promise<User>;
  // delete(id: number): Promise<void>;
};

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async getUserPreferences() {
    return { TestMealPlanPreferences, TestMealPreferences };
  }
  async findById(ctx: Context, id: string) {
    return this.userRepository.findById(ctx, id);
  }

  async setUserPreferences() {
    return { TestMealPlanPreferences, TestMealPreferences };
  }
}
