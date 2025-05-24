"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mock_data_1 = require("../../db/mock_data");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserPreferences() {
        return { TestMealPlanPreferences: mock_data_1.TestMealPlanPreferences, TestMealPreferences: mock_data_1.TestMealPreferences };
    }
    async findById(ctx, id) {
        return this.userRepository.findById(ctx.db, id);
    }
    async setUserPreferences() {
        return { TestMealPlanPreferences: mock_data_1.TestMealPlanPreferences, TestMealPreferences: mock_data_1.TestMealPreferences };
    }
}
exports.UserService = UserService;
