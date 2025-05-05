import { z } from "zod";

import { publicProcedure as publicProcedure, router } from "../trpc";
// accept userservice and return router
// routes responsible for validation and response formatting
// validation logic can be used from trpc, put it in a validators directory to share f
export const userRouter = (userSrrvice: any) =>
  router({
    getUser: publicProcedure
      .input(
        z.object({
          path: z.string().refine((val) => !val.includes(".."), {
            message: "Only relative paths allowed",
          }),
        })
      )
      .query(async ({ input }: { input: any }) => {
        // handle errors and format response etc
        const user = await userService.getUser();
        return {
          data: { yup: "yay" },
        };
      }),
  });
