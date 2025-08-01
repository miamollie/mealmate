import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import type { RecipeService } from "../../services/recipe";
import { castToTRPCError } from "../errors";

export const recipeRouter = (s: RecipeService) =>
  router({
    like: protectedProcedure
      .input(
        z.object({
          recipeId: z.string().uuid(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await s.toggleLike(ctx, input.recipeId, ctx.user.id).catch((e) => {
          console.error(e);
          return castToTRPCError(e);
        });
      }),
    getById: protectedProcedure
      .input(
        z.object({
          recipeId: z.string().uuid(),
        })
      )
      .query(async ({ ctx, input }) => {
        const recipe = await s.getById(ctx, input.recipeId).catch((e) => {
          console.error(e);
          return castToTRPCError(e);
        });
        return recipe;
      }),
      getLiked: protectedProcedure.query(async ({ ctx }) => {
        const recipes = await s.getLikedForUser(ctx, ctx.user.id).catch((e) => {
          console.error(e);
          return castToTRPCError(e);
        });
        return recipes;
      })
  });
