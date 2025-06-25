import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export const initDB = (url: string, key: string, token?: string) =>
  createClient(url, key, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
export type DB = SupabaseClient<any, "public", any>;
