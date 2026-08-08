import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

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

    const downloadUrl = `${Deno.env.get('VITE_SITE_URL') || 'https://templates.optivoic.com'}/download/${purchaseId}`;
    const portalUrl = `${Deno.env.get('VITE_SITE_URL') || 'https://templates.optivoic.com'}/portal`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; padding:0; background-color:#0b0f19; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="background-color: #0b0f19; color: #e2e8f0; padding: 40px 20px; text-align: center;">
          <div style="max-width: 560px; margin: 0 auto; background: #121827; border: 1px solid #1e293b; border-radius: 16px; padding: 36px; text-align: left; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
            
            <h1 style="color: #38b6ff; font-size: 24px; margin-top: 0; text-align: center;">🎉 Purchase Confirmed!</h1>
            <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; text-align: center;">
              Thank you for purchasing <strong>${productTitle}</strong>.
            </p>

            <div style="background-color: #1e293b; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #ffffff; font-size: 15px; margin-top: 0; margin-bottom: 12px;">🔑 How to Access Your Template:</h3>
              <ol style="color: #cbd5e1; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>1-Click Direct Download:</strong> Click the button below to download your template files right now.</li>
                <li style="margin-bottom: 8px;"><strong>Visit Client Portal:</strong> Go to <a href="${portalUrl}" style="color: #38b6ff; font-weight: bold; text-decoration: underline;">optivoic.com/portal</a> and enter <strong>${userEmail}</strong>.</li>
                <li><strong>Automatic Setup:</strong> First-time buyers will be prompted to configure a password. Existing account holders log in directly. Your template automatically unlocks on your dashboard for lifetime access!</li>
              </ol>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${downloadUrl}" style="background: linear-gradient(135deg, #38b6ff, #8b5cf6); color: #ffffff; font-weight: bold; padding: 14px 32px; border-radius: 50px; text-decoration: none; display: inline-block; font-size: 16px; box-shadow: 0 4px 15px rgba(56,182,255,0.4);">
                ⬇️ Download Template Now
              </a>
            </div>

            <p style="font-size: 14px; color: #94a3b8; text-align: center;">
              You can also manage all your digital assets anytime at <a href="${portalUrl}" style="color: #38b6ff; font-weight: bold;">Client Portal</a>.
            </p>

            <hr style="border: none; border-top: 1px solid #1e293b; margin: 30px 0;" />
            
            <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
              Need support or custom template modifications? Reply directly to this email.<br />
              <strong>OptiVöic Digital Marketplace</strong>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OptiVöic <noreply@templates.optivoic.com>',
        to: [userEmail],
        subject: `Your Purchase & Download Link: ${productTitle}`,
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
