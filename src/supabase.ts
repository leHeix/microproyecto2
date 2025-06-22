import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://odrlaboksvccoaowvnyu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcmxhYm9rc3ZjY29hb3d2bnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTY1MTMsImV4cCI6MjA2NjEzMjUxM30.noT8KAAvWmpDZ_yNZBhACgaL1OXsrd-jR9Xqw9UHNBc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);