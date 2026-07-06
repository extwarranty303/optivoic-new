import { serve } from '<https://deno.land/std@0.168.0/http/server.ts>'

const RESEND_API_KEY = Deno.env.get('VITE_RESEND_API_KEY')
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { purchaseId, userEmail, productTitle } = await req.json()

    if (!purchaseId || !userEmail || !productTitle) {
      throw new Error("Missing required fields: purchaseId, userEmail, or productTitle.");
    }

    const downloadUrl = `${Deno.env.get('VITE_SITE_URL')}/download/${purchaseId}`;
    const portalUrl = `${Deno.env.get('VITE_SITE_URL')}/portal`;

    const emailHtml = `
      <html><body>
        <h1>Thank you for your purchase!</h1>
        <p>Your purchase of <strong>${productTitle}</strong> is complete.</p>
        <p>You can access your file immediately using the secure link below, or find it anytime in your client portal.</p>
        <br/>
        <a href="${downloadUrl}" style="background-color: #38B6FF; color: black; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 8px; font-weight: bold;">Download Now</a>
        <br/><br/>
        <p>Or, <a href="${portalUrl}">visit your client portal</a> to see all your purchased assets.</p>
        <br/><p>Thank you,<br/>The OptiVöic Team</p>
      </body></html>
    `;

    const res = await fetch('<https://api.resend.com/emails>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OptiVöic <noreply@yourdomain.com>', // IMPORTANT: Replace with your verified Resend domain
        to: [userEmail],
        subject: `Your OptiVöic Download: ${productTitle}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) throw new Error(JSON.stringify(await res.json()));

    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
  }
})

