// Important: By using import type you ensure that the reference will be stripped at compile-time, meaning you don't inadvertently import server-side code into your client.

import type { AppRouter } from "../backend/transport/routers";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const validators = {};

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          Authorization: getAuthCookie(),
        };
      },
    }),
  ],
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

// TODO move all the auth stuff together both server and client?
function getAuthCookie() {
  return "boop";
}
