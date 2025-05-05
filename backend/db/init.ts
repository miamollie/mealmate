import { createClient } from "@supabase/supabase-js";

// todo move env var injection to service init
export const initDB = (url: string, key: string) => createClient(url, key);
