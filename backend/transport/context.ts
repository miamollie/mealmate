/**
 * Initialization of tRPC backend
 * Should be done only once per backend
 */
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initDB } from "../db/init";

// Context is created once per request
export const createContext = async (opts: CreateNextContextOptions) => {
  const user = await userForRequest(opts.req);
  return {
    db: initDB("foo", "bar"),
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// TOOD move to auth helper utils
async function userForRequest(req: CreateNextContextOptions["req"]) {
  if (req.headers.authorization) {
    const user = await decodeAndVerifyJwtToken(
      req.headers.authorization.split(" ")[1]
    );
    return user;
  }
  return null;
}

async function decodeAndVerifyJwtToken(token: string) {
  const user = { id: token };
  return user;
}
