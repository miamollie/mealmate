// Important: By using import type you ensure that the reference will be stripped at compile-time, meaning you don't inadvertently import server-side code into your client.
import type { AppRouter } from "../backend/transport/routers";

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { authClient } from "./src/auth";

import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc", //todo env variable
      headers: async () => {
        const authHeaders = await getAuth();
        return {
          ...authHeaders,
        };
      },
    }),
  ],
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

// TODO ensure this doesn't execute during SSR or build or it will be borked because authclient can't execute in those contexts

async function getAuth() {
  if (typeof Window === "undefined") return {};
  const session = await authClient.auth.getSession();
  const token = session.data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
