import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://doyohtsvawadoyzottsh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRveW9odHN2YXdhZG95em90dHNoIiwicm9sZSI6ImFvbiIsImV4cCI6MjA4NzI4ODc3Nn0.iHYqaP9ps_mQFHyOA-Lo30sySQkZvKSyVrba98_sB8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);