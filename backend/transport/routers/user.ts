import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { MealPreferencesSchema } from "@backend/db/schema";
import type { UserService } from "@backend/services/user";

export const userRouter = (userService: UserService) =>
  router({
    me: protectedProcedure.query(async ({ ctx }) => {
      const id = ctx.user.id;
      const user = await userService.findById(ctx, id).catch((e) => {
        console.error(e);
        throw new TRPCError({
          message: e.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      });

      return {
        data: { user },
      };
    }),
    updatePreferences: protectedProcedure
      .input(MealPreferencesSchema)
      .mutation(async ({ input, ctx }) => {
        const id = ctx.user.id;
        const pref = await userService
          .updatePreferences(ctx, id, input)
          .catch((e) => {
            console.error(e);
            return new TRPCError({
              message: e.message,
              code: "INTERNAL_SERVER_ERROR",
            });
          });

        return {
          data: { pref },
        };
      }),
    getPreferences: protectedProcedure.query(async ({ ctx }) => {
      const id = ctx.user.id;
      const pref = await userService.getPreferences(ctx, id).catch((e) => {
        console.error(e);
        return new TRPCError({
          message: e.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      });

      return {
        data: { pref },
      };
    }),
  });
