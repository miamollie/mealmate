// You could use the Standalone Adapter for local development, and a different adapter when deployed.
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./context";
import { appRouter } from "./routers";
import { renderTrpcPanel } from "trpc-ui";

// created for each request

const app = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// @ts-ignore
app.use("/docsite", (_req, res) => {
  // if (process.env.NODE_ENV !== "development") {
  //   return res.status(404).send("Not Found");
  // }

  return res.send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:4000/trpc", // Base url of your trpc server
      meta: {
        title: "My Backend Title",
        description:
          "This is a description of my API, which supports [markdown](https://en.wikipedia.org/wiki/Markdown).",
      },
    })
  );
});

app.listen(4000);

