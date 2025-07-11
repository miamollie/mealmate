import type { MealPlanRepository } from "@backend/db/repository/mealPlan";
import type { MealPlan } from "@backend/db/schema";
import type { Context } from "@backend/transport/context";
import { type RecommendationService } from "../recommendation";
import { type RecipeService } from "../recipe";
import { NOT_FOUND, UNAUTHORIZED } from "@backend/transport/errors";

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
    if (ctx.user?.id !== plan.userId) {
      throw new Error("permission_denied");
    }
    return plan;
  }

  async createForUser(ctx: Context, userId: string): Promise<MealPlan> {
    const generated = await this.recommendationService.generateRecipes(
      ctx,
      ctx.user!.id
    );

    const recipes = await this.recipeService
      .insertMany(ctx, generated.recipes)
      .catch((e) => {
        throw new Error("Failed to insert recipes: " + e.message);
      });

    return await this.mealPlanRepo
      .insert(ctx.db, { userId, recipes: recipes.map((r) => r.id) })
      .catch((e) => {
        throw new Error("Failed to blah: " + e.message);
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

    if (m.userId !== ctx.user?.id) {
      throw new Error(UNAUTHORIZED);
    }

    //TODO Anything else to check like status, is it in the past?

    const newRecipe = await this.recommendationService.generateRecipe(
      ctx,
      ctx.user.id
    );

    const r = await this.recipeService.insert(ctx, newRecipe);

    const changeset = {
      updatedAt: new Date(),
      recipes: [
        ...m.recipes.slice(0, recipeDayIndex),
        r.id,
        ...m.recipes.slice(recipeDayIndex + 1),
      ],
    };

    return this.mealPlanRepo.update(ctx.db, mealPlanID, changeset);
  }

  async getAllForUser(ctx: Context, userId: string): Promise<MealPlan[]> {
    return this.mealPlanRepo.getAllForUser(ctx.db, userId);
  }
}
