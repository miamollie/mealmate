import type { MealPlanRepository } from "@backend/db/repository/mealPlan";
import type { BaseRecipe, MealPlan } from "@backend/db/schema";
import type { Context } from "@backend/transport/context";
import { type RecommendationService } from "../recommendation";
import { type RecipeService } from "../recipe";
import { NOT_FOUND } from "@backend/transport/errors";
import { assertUserIsOwner } from "@backend/permissions";

export class MealPlanService {
  private mealPlanRepo: MealPlanRepository;
  private recommendationService: RecommendationService;
  private recipeService: RecipeService;

  constructor(
    mealPlanRepo: MealPlanRepository,
    recommendationService: RecommendationService,
    recipeService: RecipeService
  ) {
    this.mealPlanRepo = mealPlanRepo;
    this.recommendationService = recommendationService;
    this.recipeService = recipeService;
  }

  async getById(ctx: Context, id: string): Promise<MealPlan> {
    const plan = await this.mealPlanRepo.getById(ctx.db, id);

    assertUserIsOwner(ctx.user, plan.userId);

    return plan;
  }

  async createForUser(ctx: Context, userId: string): Promise<MealPlan> {
    const rs = await this.recommendationService.generateRecipes(
      ctx,
      ctx.user!.id
    );

    const recipes = await this.recipeService
      .insertMany(ctx, rs as BaseRecipe[])
      .catch((e) => {
        throw new Error("Failed to insert recipes: " + e.message);
      });

    return await this.mealPlanRepo
      .insert(ctx.db, { userId, recipes: recipes.map((r) => r.id) }) //NOTE: will this map preserve days of week ordering?
      .catch((e) => {
        throw new Error("Failed to insert meal plan: " + e.message);
      });
  }

  async replaceRecipe(
    ctx: Context,
    mealPlanID: string,
    recipeDayIndex: number
  ): Promise<MealPlan> {
    const m = await this.mealPlanRepo.getById(ctx.db, mealPlanID);

    if (!m) {
      throw new Error(NOT_FOUND);
    }

    assertUserIsOwner(ctx.user, m.userId);

    //TODO Anything else to check like status, is it in the past?

    const newRecipe = await this.recommendationService.generateRecipe(
      ctx,
      ctx.user!.id
    );

    const r = await this.recipeService.insert(ctx, newRecipe as BaseRecipe);

    const changeset = {
      updatedAt: new Date(),
      recipes: [
        ...m.recipes.slice(0, recipeDayIndex),
        r.id,
        ...m.recipes.slice(recipeDayIndex + 1),
      ],
    };

    return this.mealPlanRepo
      .update(ctx.db, mealPlanID, changeset)
      .catch((e) => {
        throw new Error("Failed to update meal plan: " + e.message);
      });
  }

  async getAllForUser(
    ctx: Context,
    userId: string,
    options?: { page?: number; limit?: number }
  ): Promise<{
    data: MealPlan[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }> {
    assertUserIsOwner(ctx.user, userId);

    return this.mealPlanRepo
      .getAllForUser(ctx.db, userId, options)
      .catch((e) => {
        throw new Error("Failed to get meal plans: " + e.message);
      });
  }
}
