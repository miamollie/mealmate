import type { RecipeRepository } from "@backend/db/repository/recipe";
import type { LikedRecipe, Recipe } from "../../db/schema";
import type { Context } from "@backend/transport/context";

export class RecipeService {
  private recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async getById(ctx: Context, id: string): Promise<Recipe | null> {
    //do recipes belong to users? if so, permission check here or check for a status of "public or private"
    return await this.recipeRepository.getById(ctx.db, id);
  }

  async getLikedForUser(ctx: Context, userId: string): Promise<LikedRecipe[]> {
    return await this.recipeRepository.getLikedForUser(ctx.db, userId);
  }

  async toggleLike(ctx: Context, id: string, userId: string): Promise<void> {
    //TODO - check if already liked, then remove or like
    await this.recipeRepository.like(ctx.db, id, userId);
  }

  async insertMany(ctx: Context, recipes: Recipe[]): Promise<Recipe[]> {
    //TODO - loop over recipes and perform DB similarity check before inserting
    return await this.recipeRepository.insertMany(ctx.db, recipes);
  }
  async insert(ctx: Context, r: Recipe): Promise<Recipe> {
    //loop over recipes and perform DB similarity check
    return await this.recipeRepository.insert(ctx.db, r);
  }
}
