import { initDB } from "../db/init";
import { LocalCache } from "../cache";
import { AIClient } from "../clients/ai";
import { UserService } from "./user";
import { RecommendationService } from "./recommendation";

let services: {
  userService: any;
  recommendationService: RecommendationService;
};

export async function initServices() {
  if (!services) {
    const db = await initDB(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
    const cache = new LocalCache(); // handle env switch for behaviour here
    const aiClient = new AIClient(process.env.OPENAI_API_KEY!); // todo set up env vars
    const userService = new UserService(db);
    services = {
      userService: userService,
      recommendationService: new RecommendationService(
        aiClient,
        userService,
        cache
      ),
    };
  }
  return services;
}
