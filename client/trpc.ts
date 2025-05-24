// Important: By using import type you ensure that the reference will be stripped at compile-time, meaning you don't inadvertently import server-side code into your client.

import type { AppRouter } from "../backend/transport/routers";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { authClient } from "./src/auth";

import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getBaseUrl() + "/trpc",
      // You can pass any HTTP headers you wish here
      headers: async () => {
        return {
          ...getAuth(),
        };
      },
    }),
  ],
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

async function getAuth() {
  const session = await authClient.auth.getSession();
  const token = session.data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.PUBLIC_API_URL; // dev
}
