import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || "https://YOUR_PROJECT_ID.supabase.co",
  supabaseAnonKey || "YOUR_SUPABASE_ANON_KEY",
);
