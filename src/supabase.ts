import { createClient } from '@supabase/supabase-js';

function requireEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `On Vercel: Project Settings → Environment Variables → add ${name} (no quotes) then redeploy.`,
    );
  }
  return value;
}

export const supabase = createClient(
  requireEnv('VITE_SUPABASE_URL'),
  requireEnv('VITE_SUPABASE_ANON_KEY'),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

