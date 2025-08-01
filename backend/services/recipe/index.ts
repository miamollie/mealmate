import type { RecipeRepository } from "@backend/db/repository/recipe";
import type { BaseRecipe, LikedRecipe, Recipe } from "@backend/db/schema";
import type { Context } from "@backend/transport/context";
import { NOT_FOUND } from "@backend/transport/errors";
import { assertUserIsOwner } from "@backend/permissions";

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
    assertUserIsOwner(ctx.user, userId);
    return await this.recipeRepository.getLikedForUser(ctx.db, userId);
  }

  async toggleLike(ctx: Context, id: string, userId: string): Promise<void> {
    const r = await this.recipeRepository.getById(ctx.db, id);
    if (!r) {
      throw new Error(NOT_FOUND);
    }

    return this.recipeRepository.like(ctx.db, id, userId);
  }

  async insertMany(ctx: Context, recipes: BaseRecipe[]): Promise<Recipe[]> {
    //TODO - loop over recipes and perform DB similarity check before inserting
    return await this.recipeRepository.insertMany(ctx.db, recipes);
  }
  async insert(ctx: Context, r: BaseRecipe): Promise<Recipe> {
    //TODO - perform DB similarity check before insert
    return await this.recipeRepository.insert(ctx.db, r);
  }
}
