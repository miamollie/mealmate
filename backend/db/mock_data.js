"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMeal = exports.TestMealPlan = exports.TestMealPreferences = exports.TestMealPlanPreferences = exports.TestUser = void 0;
exports.TestUser = {
    id: "1",
    email: "QcYK0@example.com",
    username: "oh hai",
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.TestMealPlanPreferences = {
    peopleCount: 0,
    weekStart: "",
    includeLeftovers: false,
};
exports.TestMealPreferences = {
    cuisines: [],
    allergies: ["dairy"],
    spiceLevel: "medium",
    dietary: [],
};
exports.TestMealPlan = {
    id: "1",
    userId: "1",
    weekStartDate: new Date(),
    mealIds: [
        {
            day: "MONDAY",
            mealId: "1",
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.TestMeal = {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Such a yummy meal",
    description: "",
    ingredients: [],
    instructions: [],
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    difficulty: "medium",
    cuisine: "",
    category: [],
    keyIngredients: [],
};
