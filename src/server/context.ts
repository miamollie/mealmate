import { initTRPC } from '@trpc/server';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
 
export const createContext = async (opts: CreateNextContextOptions) => {
 
  return {
    foo: "bar",
    db: supabase,
    user: userForRequest(opts.req),
  };
};
 
export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const procedure = t.procedure;


// todo move  to DB client/repository package - add db client to router context
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);


// TOOD move to auth helper utils
async function userForRequest(req: CreateNextContextOptions['req']) {
    if (req.headers.authorization) {
      const user = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1],
      );
      return user;
    }
    return null;
}

async function decodeAndVerifyJwtToken(token: string) {
    const user = {id: "meep"};
    return user;
}
