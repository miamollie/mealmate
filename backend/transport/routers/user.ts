import type { Context } from "../context";
import { protectedProcedure, router } from "../trpc";
// accept userservice and return router
// routes responsible for validation and response formatting
// validation logic can be used from trpc, put it in a validators directory to share f
export const userRouter = (userService: any) =>
  router({
    getUser: protectedProcedure.query(async ({ ctx }: { ctx: Context }) => {
      // get user from context _ todo should never be null in protected procedure
      const id = ctx.user!.id;
      const user = await userService.findById(id);
      console.log(user);

      // handle errors and format response etc

      return {
        data: { yup: "yay" },
      };
    }),
  });
