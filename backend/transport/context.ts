/**
 * Initialization of tRPC backend
 * Should be done only once per backend
 */
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initDB } from "../db/init";
import { TestUser } from "../db/mock_data";
import { SupabaseClient } from "@supabase/supabase-js";

// Context is created once per request
// DB connection added to context to support RLS protection
export const createContext = async (opts: CreateNextContextOptions) => {
  const user = await userForRequest(opts.req);
  const supabase = initDB(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.PUBLIC_SUPABASE_KEY!
  );

  const token = await tokenForRequest(supabase);

  return {
    db: supabase,
    user,
    token,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// TOOD move to auth helper utils
async function userForRequest(req: CreateNextContextOptions["req"]) {
  if (req.headers.authorization) {
    // const user = await decodeAndVerifyJWT(
    //   req.headers.authorization.split(" ")[1]
    // );
    return TestUser; // todo, prob just want a subset of user data, not all. maybe use model for this?
  }
  return null;
}

async function tokenForRequest(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token;
}
