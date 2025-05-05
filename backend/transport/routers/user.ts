import { z } from "zod";

import { publicProcedure as publicProcedure, router } from "../trpc";
// accept userservice and return router
// routes responsible for validation and response formatting
// validation logic can be used from trpc, put it in a validators directory to share f
export const userRouter = router({
  getUser: publicProcedure
    .input(
      z.object({
        path: z.string().refine((val) => !val.includes(".."), {
          message: "Only relative paths allowed",
        }),
      })
    )
    .query(async ({ input }: { input: any }) => {
      console.log(input.path);
      return {
        data: { yup: "yay" },
      };
    }),
});
