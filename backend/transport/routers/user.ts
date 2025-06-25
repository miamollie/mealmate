import { TRPCError } from "@trpc/server";
import type { UserServiceType } from "../../services/user";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { MealPreferencesSchema } from "@backend/db/schema";
// routes responsible for validation and response formatting
// validation logic can be used from trpc, put it in a validators directory to share w f/e?
export const userRouter = (userService: UserServiceType) =>
  router({
    me: protectedProcedure.query(async ({ ctx }) => {
      const id = ctx.user.id;
      const user = await userService.findById(ctx, id).catch((e) => {
        console.error(e);
        return new TRPCError({
          message: "todo",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

      if (!user) {
        return new TRPCError({
          message: "todo",
          code: "NOT_FOUND",
        });
      }

      return {
        data: { user },
      };
    }),
    updatePreferences: protectedProcedure
      .input(MealPreferencesSchema)
      .mutation(async ({ input, ctx }) => {
        const id = ctx.user.id;

        // at the router layer we ensure input and output format, enforce validation and permissions as applicable
        // perform any transport layer concerns
        const user = await userService
          .updatePreferences(ctx, id, input)
          .catch((e) => {
            console.error(e);
            return new TRPCError({
              message: "todo",
              code: "INTERNAL_SERVER_ERROR",
            });
          });

        if (!user) {
          return new TRPCError({
            message: "todo",
            code: "NOT_FOUND",
          });
        }

        return {
          data: { user },
        };
      }),
  });
