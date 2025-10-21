import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NetflixContent {
  id: string;
  show_id: string;
  type: string;
  title: string;
  director: string | null;
  cast_members: string | null;
  country: string | null;
  date_added: string | null;
  release_year: number | null;
  rating: string | null;
  duration: string | null;
  listed_in: string | null;
  description: string | null;
  created_at: string;
}
