import { createClient } from '@supabase/supabase-js';

// Paste your actual Project URL between the quotes below
const supabaseUrl = 'https://doyohtsvawadoyzottsh.supabase.co';

// Paste your actual Anon/Public key between the quotes below
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRveW9odHN2YXdhZG95em90dHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MTI3NzYsImV4cCI6MjA4NzI4ODc3Nn0.iHYqaP9ps_mNQFHyOA-Lo30sySQkZvKSyVrba98_sB8'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);