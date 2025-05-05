import {
  TestMealPlanPreferences,
  TestMealPreferences,
} from "../../db/mock_data";

export class UserService {
  private DB: DB;

  constructor(DB: DB) {
    this.DB = DB;
  }
  async getUserPreferences() {
    return { TestMealPlanPreferences, TestMealPreferences };
  }

  async setUserPreferences() {
    return { TestMealPlanPreferences, TestMealPreferences };
  }
}
