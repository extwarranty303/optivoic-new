import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wekjabmdztgkhfszgyeg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2phYm1kenRna2hmc3pneWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNzEyMzcsImV4cCI6MjA5ODg0NzIzN30.Evp2NYld38fAfTr3RPemDmBcLPC06o7OwgzWEEOH6ss';

const anonClient = createClient(supabaseUrl, supabaseAnonKey);

async function testRLS() {
  console.log("--- ANON QUERY TO PURCHASES TABLE ---");
  const { data: purchases, error: pErr } = await anonClient.from('purchases').select('*');
  console.log("Anon Purchases returned:", purchases?.length, "Error:", pErr);
}

testRLS();
