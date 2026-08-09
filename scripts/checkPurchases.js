import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wekjabmdztgkhfszgyeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2phYm1kenRna2hmc3pneWVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzI3MTIzNywiZXhwIjoyMDk4ODQ3MjM3fQ.jr9jYAtCydfy7pjGcifRfIxXp8ICUG9PEoy8Cz4mU5M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log("--- PURCHASES TABLE ---");
  const { data: purchases, error: pErr } = await supabase.from('purchases').select('*');
  if (pErr) console.error("Purchases Error:", pErr);
  else console.log("Purchases count:", purchases?.length, JSON.stringify(purchases, null, 2));

  console.log("\n--- ORDERS TABLE ---");
  const { data: orders, error: oErr } = await supabase.from('orders').select('*');
  if (oErr) console.error("Orders Error:", oErr);
  else console.log("Orders count:", orders?.length, JSON.stringify(orders, null, 2));
}

checkData();
