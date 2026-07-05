import { supabase } from '../supabaseClient';

const productLookup = {
  '36a7cc71-0c17-4530-a653-e59a8dbda7a3': {
    title: 'The Ultimate E-Commerce Reseller Profit & COGS Tracker',
    category: 'Digital Template'
  },
  'reseller-command-center': {
    title: 'Reseller Command Center',
    category: 'Business Package'
  }
};

export async function sendPurchaseEmail({ purchase, userEmail, templateId, productTitle }) {
  const baseUrl = typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : 'https://www.optivoic.com';

  const downloadUrl = `${baseUrl}/download/${purchase.id}`;
  const templateName = productTitle || productLookup[templateId]?.title || 'your digital asset';

  try {
    const { data: productData } = await supabase
      .from('products')
      .select('current_file_id, title')
      .eq('id', templateId)
      .maybeSingle();

    let signedUrl = null;

    if (productData?.current_file_id) {
      const { data: fileMeta } = await supabase
        .from('files')
        .select('storage_path, original_filename')
        .eq('id', productData.current_file_id)
        .maybeSingle();

      if (fileMeta?.storage_path) {
        const { data: signedData } = await supabase.storage
          .from('templates')
          .createSignedUrl(fileMeta.storage_path, 60, {
            download: fileMeta.original_filename || 'download.zip'
          });

        signedUrl = signedData?.signedUrl || null;
      }
    }

    const payload = {
      to: userEmail,
      subject: `Your Optivoic download is ready: ${templateName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 8px;">Your download is ready</h2>
          <p>Thanks for your purchase of <strong>${templateName}</strong>.</p>
          <p>You can access your secure download here:</p>
          <p><a href="${downloadUrl}" style="display:inline-block; padding:12px 18px; background:#0ea5e9; color:white; text-decoration:none; border-radius:999px;">Open your download</a></p>
          <p>If the button does not work, use this link: <a href="${downloadUrl}">${downloadUrl}</a></p>
          ${signedUrl ? `<p>Direct download preview: <a href="${signedUrl}">Open file</a></p>` : ''}
          <p>Need help? Reply to this email or reach out to support@optivoic.com.</p>
        </div>
      `,
      text: `Your Optivoic download is ready. Visit ${downloadUrl} to access your purchase.`,
      purchaseId: purchase.id,
      downloadUrl,
      templateName
    };

    if (import.meta.env.VITE_RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Optivoic <noreply@optivoic.com>',
          to: [userEmail],
          subject: payload.subject,
          html: payload.html,
          text: payload.text
        })
      });
      return { success: true, method: 'resend' };
    }

    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.functions.invoke('send-purchase-email', { body: payload });
      return { success: true, method: 'edge-function' };
    }

    return { success: false, method: 'unconfigured' };
  } catch (error) {
    return { success: false, method: 'error', error: error.message };
  }
}
