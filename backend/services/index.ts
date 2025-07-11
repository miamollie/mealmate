import { AIClient } from "../clients/ai";
import { UserService } from "./user";
import { RecommendationService } from "./recommendation";
import { UserRepository } from "../db/repository/user";
import { RecipeRepository } from "../db/repository/recipe";
import { MealPlanRepository } from "../db/repository/mealPlan";
import { MealPlanService } from "./mealplan";
import { RecipeService } from "./recipe";

export type ServicesType = ReturnType<typeof initServices>;

export function initServices() {
  const aiClient = new AIClient(process.env.OPENAI_API_KEY || "derp"); // todo set up env vars
  const userRepo = new UserRepository();
  const recipeRepo = new RecipeRepository();
  const mealPlanRepo = new MealPlanRepository();
  const userService = new UserService(userRepo);
  const recipeService = new RecipeService(recipeRepo);
  const mealPlanService = new MealPlanService(mealPlanRepo);
  const recommendationService = new RecommendationService(
    aiClient,
    userService,
    recipeService,
    mealPlanService
  );

  return {
    userService: userService,
    recommendationService,
    recipeService: recipeService,
    mealPlanService: mealPlanService,
  };
}
