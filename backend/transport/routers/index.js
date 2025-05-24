"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const user_1 = require("./user");
const appRouter = (services) => (0, trpc_1.router)({
    healthcheck: trpc_1.publicProcedure.query(() => "ok"),
    user: (0, user_1.userRouter)(services.userService), // routes related to user identity including user profile/preferences for  meals
    mealPlan: trpc_1.publicProcedure.query(() => "ok"), // all routes realted to set of meals
    meal: trpc_1.publicProcedure.query(() => "ok"), // all routes realted to an individual
});
exports.appRouter = appRouter;
