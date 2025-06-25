import { protectedProcedure, router } from "../trpc";
import type { RecommendationService } from "../../services/recommendation";

export const recommendationRouter = (service: RecommendationService) =>
  router({
    createForUser: protectedProcedure.mutation(async ({ ctx }) => {
      const id = ctx.user.id;

      return service.recommendMeals(ctx, id);
    }),
  });
