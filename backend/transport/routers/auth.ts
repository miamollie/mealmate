import { z } from "zod";

import { publicProcedure as publicProcedure, router } from "../trpc";

export const userRouter = router({
  signUp: publicProcedure
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
