import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const profileRouter = router({
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        peopleCount: z.number().min(1).optional(),
        dietaryPreferences: z.array(z.string()).optional(),
        allergies: z.array(z.string()).optional(),
        cuisinePreferences: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { data: updatedUser, error } = await ctx.db
        .from("users") //TODO seperate users table and profile preferences
        .update({
          ...input,
          updated_at: new Date(),
        })
        .eq("id", ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new Error("Failed to update user profile");
      }

      return updatedUser;
    }),
});
