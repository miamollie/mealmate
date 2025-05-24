"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServices = initServices;
const cache_1 = require("../cache");
const ai_1 = require("../clients/ai");
const user_1 = require("./user");
const recommendation_1 = require("./recommendation");
const user_2 = require("../db/repository/user");
function initServices() {
    const cache = new cache_1.LocalCache(); // handle env switch for behaviour here
    const aiClient = new ai_1.AIClient(process.env.OPENAI_API_KEY || "derp"); // todo set up env vars
    const userRepo = new user_2.UserRepository();
    const userService = new user_1.UserService(userRepo);
    return {
        // mealsService: new MealsService(db),
        // mealPlanService: new MealPlanService(db, cache),
        userService: userService,
        recommendationService: new recommendation_1.RecommendationService(aiClient, userService, cache),
    };
}
