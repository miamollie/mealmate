import { protectedProcedure, router } from "../trpc";
import type { RecommendationService } from "../../services/recommendation";

export const recommendationRouter = (service: RecommendationService) =>
  router({
    createForUser: protectedProcedure.mutation(async () => {
      // todo error handling
      // user from context
      // apply rate limit middleware
      return service.recommendMeals;
    }),
  });
