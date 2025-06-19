import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "../backend/transport/context";
import { appRouter } from "../backend/transport/routers";
import { renderTrpcPanel } from "trpc-ui";
import { initServices } from "../backend/services";

import dotenv from "dotenv";
// vercell will inject for prod
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.dev" });
}
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
      url: process.env.VITE_API_URL!, // Base url of your trpc server
      meta: {
        title: "Meal Mate",
        description: "AI powered meal planning",
      },
    })
  );
});

// local dev only, file has been run directly
if (process.env.NODE_ENV !== "production") {
  app.listen(4000, () => {
    console.log("🚀 tRPC server running on http://localhost:4000");
  });
}

export default app;
