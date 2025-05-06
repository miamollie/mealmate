import { DB } from "../../db/init";
import {
  TestMealPlanPreferences,
  TestMealPreferences,
} from "../../db/mock_data";
import { UserRepository } from "../../db/repository/user";
import type { User } from "../../db/schema";

export type UserServiceType = {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
};

export class UserService {
  private userRepository: UserRepository;
  // todo move all userRepository stuff and use repository instead of direct userRepository query

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async getUserPreferences() {
    return { TestMealPlanPreferences, TestMealPreferences };
  }
  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async setUserPreferences() {
    return { TestMealPlanPreferences, TestMealPreferences };
  }
}
