import { protectedProcedure, router } from "../trpc";
import { MealPreferencesSchema } from "@backend/db/schema";
import type { UserService } from "@backend/services/user";
import { castToTRPCError } from "../errors";

export const userRouter = (userService: UserService) =>
  router({
    me: protectedProcedure.query(async ({ ctx }) => {
      const id = ctx.user.id;
      const user = await userService.getById(ctx, id).catch((e) => {
        console.error(e);
        return castToTRPCError(e);
      });

      return {
        data: { user },
      };
    }),
    setPreferences: protectedProcedure
      .input(MealPreferencesSchema.partial())
      .mutation(async ({ input, ctx }) => {
        const id = ctx.user.id;
        const pref = await userService
          .setPreferences(ctx, id, input)
          .catch((e) => {
            console.error(e);
            return castToTRPCError(e);
          });

        return {
          data: { pref },
        };
      }),
    getPreferences: protectedProcedure.query(async ({ ctx }) => {
      const id = ctx.user.id;
      const pref = await userService.getPreferences(ctx, id).catch((e) => {
        console.error(e);
        return castToTRPCError(e);
      });

      return {
        data: { pref },
      };
    }),
  });
