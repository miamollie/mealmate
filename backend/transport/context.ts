/**
 * Initialization of tRPC backend
 * Should be done only once per backend
 */
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initDB } from "../db/init";
import { TestUser } from "../db/mock_data";
// import type { SupabaseClient } from "@supabase/supabase-js";

// Context is created once per request
// DB connection added to context to support RLS protection
// RLS protection requires user auth token
export const createContext = async (opts: CreateNextContextOptions) => {
  const user = await userForRequest(opts.req);
  const supabase = initDB(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );

  // const _ = await tokenForRequest(supabase);

  return {
    db: supabase,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Retrieves the user associated with the incoming request.
 *
 * Checks the authorization header for a JWT token, decodes and verifies it
 * to fetch the user details. Returns a `TestUser` object as a placeholder
 * for the user data. This function needs to be updated to return a subset
 * of user data using an appropriate model.
 *
 * @param req - The HTTP request object from which to extract the authorization header.
 * @returns The user object if authorization is successful; otherwise, null.
 */

/*******  fd1f3ed3-61e9-49e8-b8a8-b5123ad546fe  *******/
async function userForRequest(req: CreateNextContextOptions["req"]) {
  if (req.headers.authorization) {
    // const user = await decodeAndVerifyJWT(
    //   req.headers.authorization.split(" ")[1]
    // );
    return TestUser; // todo, prob just want a subset of user data, not all. maybe use model for this?
  }
  return null;
}

// async function tokenForRequest(supabase: SupabaseClient) {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   console.log(session);
//   if (!session) return null;
//   return session.access_token;
// }
