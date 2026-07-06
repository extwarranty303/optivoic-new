import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// --- Environment Variables ---
const PAYPAL_CLIENT_ID = Deno.env.get('VITE_PAYPAL_CLIENT_ID');
const PAYPAL_CLIENT_SECRET = Deno.env.get('PAYPAL_CLIENT_SECRET');
const PAYPAL_API_BASE_URL = Deno.env.get('PAYPAL_API_BASE_URL') || 'https://api-m.sandbox.paypal.com';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

// --- CORS Headers ---
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- Helper: Generate PayPal Access Token ---
async function generatePayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('Missing PayPal API credentials.');
  }
  const auth = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`);
  const response = await fetch(`${PAYPAL_API_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to get PayPal access token: ${data.error_description}`);
  }
  return data.access_token;
}

// --- Main Server Logic ---
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Initialize Supabase Admin Client for secure operations
    const supabaseAdmin = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));

    // 2. Get user session from the request authorization header
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: req.headers.get('Authorization')! } }
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Authentication failed. User not found.');
    }

    // 3. Get payload from client
    const { orderId, productId } = await req.json();
    if (!orderId || !productId) {
      throw new Error('Missing orderId or productId in request body.');
    }

    // 4. Fetch product details from DB to verify price
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('price_cents, title')
      .eq('id', productId)
      .single();
    if (productError || !product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    // 5. Verify the PayPal order
    const accessToken = await generatePayPalAccessToken();
    const paypalResponse = await fetch(`${PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const paypalOrder = await paypalResponse.json();
    
    if (!paypalResponse.ok) throw new Error(paypalOrder.message || 'Failed to fetch PayPal order.');
    if (paypalOrder.status !== 'COMPLETED' && paypalOrder.status !== 'APPROVED') {
      throw new Error(`PayPal order status is not complete: ${paypalOrder.status}`);
    }

    // 6. Validate payment amount
    const purchaseUnit = paypalOrder.purchase_units[0];
    const paidAmount = parseFloat(purchaseUnit.amount.value);
    const expectedAmount = parseFloat((product.price_cents / 100).toFixed(2));
    
    if (paidAmount < expectedAmount) {
      // Potentially fraudulent transaction, log and reject
      throw new Error(`Payment validation failed. Expected ${expectedAmount} but received ${paidAmount}.`);
    }

    // 7. Insert the purchase record into the database
    const { data: purchaseData, error: insertError } = await supabaseAdmin
      .from('purchases')
      .insert({
        user_id: user.id,
        user_email: user.email,
        product_id: productId,
        paypal_order_id: orderId, // Store PayPal order ID for reference
      })
      .select('id')
      .single();

    if (insertError) {
      throw new Error(`Failed to record purchase in database: ${insertError.message}`);
    }

    // 8. Trigger the purchase confirmation email
    const { error: emailError } = await supabaseAdmin.functions.invoke('send-purchase-email', {
      body: { 
        purchaseId: purchaseData.id, 
        userEmail: user.email, 
        productTitle: product.title 
      },
    });

    if (emailError) {
      // Log the error but don't fail the transaction, as the user has paid and has portal access.
      console.error(`Purchase ${purchaseData.id} succeeded, but email failed:`, emailError);
    }
    
    // 9. Return success
    return new Response(JSON.stringify({ success: true, purchaseId: purchaseData.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
