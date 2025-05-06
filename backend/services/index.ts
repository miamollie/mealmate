import { initDB } from "../db/init";
import { LocalCache } from "../cache";
import { AIClient } from "../clients/ai";
import { UserService } from "./user";
import { RecommendationService } from "./recommendation";
import { UserRepository } from "../db/repository/user";

export type ServicesType = ReturnType<typeof initServices>;

export async function initServices() {
  // todo db connection created in ctx instead so each request gets own isolated connection
  const db = await initDB(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const cache = new LocalCache(); // handle env switch for behaviour here
  const aiClient = new AIClient(process.env.OPENAI_API_KEY!); // todo set up env vars
  const userRepo = new UserRepository();
  const userService = new UserService(userRepo);
  return {
    // mealsService: new MealsService(db),
    // mealPlanService: new MealPlanService(db, cache),
    userService: userService,
    recommendationService: new RecommendationService(
      aiClient,
      userService,
      cache
    ),
  };
}
