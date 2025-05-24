"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealPlanSchema = exports.mealSchema = exports.mealPreferencesSchema = exports.mealPlanPreferencesSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.mealPlanPreferencesSchema = zod_1.z.object({
    peopleCount: zod_1.z.number().min(1),
    weekStart: zod_1.z.string(), // Day of the week to start meal plan
    // todo make this a number from 0 -> 7 (include suggestions for slight meal  variation e.g naan not rice)
    includeLeftovers: zod_1.z.boolean().default(false), // Whether to include leftovers or have 7 new meals
});
exports.mealPreferencesSchema = zod_1.z.object({
    cuisines: zod_1.z.array(zod_1.z.enum(["indian", "vietnamese", "italian", "greek", "mexican"])),
    allergies: zod_1.z.array(zod_1.z.enum(["peanuts", "eggs", "gluten", "soy", "dairy"])), // TODO: Add more()),
    spiceLevel: zod_1.z.enum(["low", "medium", "high"]),
    dietary: zod_1.z.array(zod_1.z.enum(["vegetarian", "vegan", "kosher", "fodmap", "halal", "paleo"])),
});
exports.mealSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.array(zod_1.z.string()),
    instructions: zod_1.z.array(zod_1.z.string()),
    prepTime: zod_1.z.number(),
    cookTime: zod_1.z.number(),
    servings: zod_1.z.number(),
    difficulty: zod_1.z.enum(["easy", "medium", "hard"]),
    cuisine: zod_1.z.string(),
    category: zod_1.z.array(zod_1.z.string()), // e.g., ['dinner', 'vegetarian', 'quick']
    keyIngredients: zod_1.z.array(zod_1.z.string()), // For filtering by main ingredients
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.mealPlanSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    weekStartDate: zod_1.z.date(),
    mealIds: zod_1.z.array(zod_1.z.object({
        day: zod_1.z.string(),
        mealId: zod_1.z.string().uuid(),
    })),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
