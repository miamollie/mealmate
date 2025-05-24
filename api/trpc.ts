import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "../backend/transport/context";
import { appRouter } from "../backend/transport/routers";
import { renderTrpcPanel } from "trpc-ui";
import { initServices } from "../backend/services";

const app = express();

// create services as global on boot
const services = await initServices();

// import rate limit middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter(services),
    createContext, // context is created for each request
  })
);

// @ts-ignore
app.use("/docsite", (_, res) => {
  return res.send(
    renderTrpcPanel(appRouter(services), {
      url: "http://localhost:4000/trpc", // Base url of your trpc server
      meta: {
        title: "Meal Mate",
        description: "AI powered meal planning",
      },
    })
  );
});

app.listen(4000, () => {
  console.log("🚀 tRPC server running on http://localhost:4000");
});
