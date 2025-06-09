import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "../backend/transport/context";
import { appRouter } from "../backend/transport/routers";
import { renderTrpcPanel } from "trpc-ui";
import { initServices } from "../backend/services";

import dotenv from "dotenv";
// dotenv.config(); // defaults to `.env`
dotenv.config({ path: ".env.dev" }); // todo dev/prod split? Perhaps irrelevant if env var must be set in vercel UI

const app = express();

// create services as global on boot
const services = initServices();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter(services),
    createContext, // context is created for each request
    onError: ({ error }) => {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        // Return a 500 error with a JSON response
        return {
          status: 500,
          body: JSON.stringify({ error: "Internal Server Error" }),
        };
      }
      // Return a 400 error with a JSON response
      return {
        status: 400,
        body: JSON.stringify({ error: error.message }),
      };
    },
  })
);

// @ts-ignore
app.use("/docsite", (_, res) => {
  return res.send(
    renderTrpcPanel(appRouter(services), {
      url: process.env.PUBLIC_API_URL! || "http://localhost:4000/trpc", //todo, got problem with env vars loading // Base url of your trpc server
      meta: {
        title: "Meal Mate",
        description: "AI powered meal planning",
      },
    })
  );
});

app.listen(4000, () => {
  console.log("🚀 tRPC server running on:" + process.env.PUBLIC_API_URL!);
});
