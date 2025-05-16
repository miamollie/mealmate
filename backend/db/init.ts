import { createClient } from "@supabase/supabase-js";

export const initDB = (url: string, key: string) => createClient(url, key);
export type DB = ReturnType<typeof createClient>;
