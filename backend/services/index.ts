// services/index.js
import { connectDb } from "../db";
import { UserService } from "./user.service";
import { OrderService } from "./order.service";
import { RecommendationService } from "./recommendation";

let services: { userService: any; orderService: any; recommendationService: RecommendationService; };

export async function initServices() {
  if (!services) {
    const db = await connectDb();
    const cache = new LocalCache();
    const completion = new Completion();
    const userService = new UserService(db);
    services = {
      userService: userService,
      orderService: new OrderService(db),
      recommendationService: new RecommendationService(
        completion,
        userService,
        cache
      ),
    };
  }
  return services;
}
