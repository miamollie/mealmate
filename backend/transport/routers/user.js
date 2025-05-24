"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const server_1 = require("@trpc/server");
const trpc_1 = require("../trpc");
// routes responsible for validation and response formatting
// validation logic can be used from trpc, put it in a validators directory to share w f/e?
const userRouter = (userService) => (0, trpc_1.router)({
    me: trpc_1.protectedProcedure.query(async ({ ctx }) => {
        const id = ctx.user.id;
        const user = await userService.findById(ctx, id).catch((e) => {
            console.error(e);
            return new server_1.TRPCError({
                message: "todo",
                code: "INTERNAL_SERVER_ERROR",
            });
        });
        if (!user) {
            return new server_1.TRPCError({
                message: "todo",
                code: "NOT_FOUND",
            });
        }
        return {
            data: { user },
        };
    }),
});
exports.userRouter = userRouter;
// import { z } from "zod";
// import { protectedProcedure, router } from "../trpc";
// export const profileRouter = router({
//   updateUserProfile: protectedProcedure
//     .input(
//       z.object({
//         peopleCount: z.number().min(1).optional(),
//         dietaryPreferences: z.array(z.string()).optional(),
//         allergies: z.array(z.string()).optional(),
//         cuisinePreferences: z.array(z.string()).optional(),
//       })
//     )
//     .mutation(async ({ input, ctx }) => {
//       const { data: updatedUser, error } = await ctx.db
//         .from("users") //TODO seperate users table and profile preferences
//         .update({
//           ...input,
//           updated_at: new Date(),
//         })
//         .eq("id", ctx.user.id)
//         .select()
//         .single();
//       if (error) {
//         throw new Error("Failed to update user profile");
//       }
//       return updatedUser;
//     }),
// });
