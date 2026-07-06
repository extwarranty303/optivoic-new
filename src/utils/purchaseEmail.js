import { supabase } from '../supabaseClient';

export const sendPurchaseEmail = async ({ purchase, userEmail, productTitle }) => {
  if (!purchase || !purchase.id) {
    console.error("sendPurchaseEmail error: Invalid purchase object provided.");
    return;
  }

  try {
    const { data, error } = await supabase.functions.invoke('send-purchase-email', {
      body: {
        purchaseId: purchase.id,
        userEmail: userEmail,
        productTitle: productTitle,
      },
    });

    if (error) throw error;

    console.log("Purchase email function invoked successfully:", data);
    return { success: true, data };

  } catch (error) {
    console.error('Error sending purchase email:', error.message);
    return { success: false, error };
  }
};

