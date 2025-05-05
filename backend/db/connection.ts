import { createClient } from "@supabase/supabase-js";

const db = createClient("http:///a", "/b");
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
