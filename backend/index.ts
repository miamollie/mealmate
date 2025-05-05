// You could use the Standalone Adapter for local development, and a different adapter when deployed.
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./transport/context";
import { appRouter } from "./transport/routers";
import { renderTrpcPanel } from "trpc-ui";

const app = express();

const services = await initServices();


app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext, // context is created for each request
  })
);

// @ts-ignore
app.use("/docsite", (_req, res) => {
  // only serve docsite locally
  // if (process.env.NODE_ENV !== "development") {
  //   return res.status(404).send("Not Found");
  // }

  return res.send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:4000/trpc", // Base url of your trpc server
      meta: {
        title: "Meal Mate",
        description: "AI powered meal planning",
      },
    })
  );
});

app.listen(4000);
