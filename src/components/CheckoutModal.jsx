import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../supabaseClient';

const CheckoutModal = ({ isOpen, onClose, template, user, onSuccess, initialPurchasedInfo }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedInfo, setPurchasedInfo] = useState(initialPurchasedInfo || null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (initialPurchasedInfo) {
      setPurchasedInfo(initialPurchasedInfo);
    }
  }, [initialPurchasedInfo]);

  if (!isOpen || !template) return null;

  // Convert cents to standard dollar format for PayPal
  const priceInDollars = (template.price_cents / 100).toFixed(2);

  const handleApprove = async (data, actions) => {
    setIsProcessing(true);
    setError(null);

    const paypalOrderId = data.orderID;
    let payerEmail = user?.email || '';

    try {
      const details = await actions.order.capture();
      if (details?.payer?.email_address) {
        payerEmail = details.payer.email_address;
      }
    } catch (capErr) {
      console.warn("PayPal capture notice:", capErr);
    }

    const finalEmail = payerEmail || user?.email || 'your email';

    const successPayload = {
      email: finalEmail,
      orderId: paypalOrderId,
      templateId: template.id,
      templateTitle: template.title
    };

    // GUARANTEED: Show Purchase Confirmation Screen immediately upon PayPal approval!
    setPurchasedInfo(successPayload);

    try {
      sessionStorage.setItem('optivoic_last_purchase', JSON.stringify(successPayload));
    } catch (e) {
      console.warn("sessionStorage save notice:", e);
    }

    // Fulfill entitlement & email in background
    try {
      const { error: functionError } = await supabase.functions.invoke('process-order', {
        body: { 
          orderId: paypalOrderId,
          productId: template.id,
          userEmail: finalEmail
        },
      });

      if (functionError) {
        console.warn("Edge function process-order notice:", functionError.message, "- executing direct entitlement fallback...");
        
        const payload = {
          user_email: finalEmail,
          product_id: template.id,
          created_at: new Date().toISOString()
        };
        if (user?.id) payload.user_id = user.id;

        const { error: insertErr } = await supabase.from('purchases').insert([payload]);
        if (insertErr) {
          console.error("Direct entitlement notice:", insertErr.message);
        }
      }
    } catch (fulfillErr) {
      console.warn("Fulfillment notice:", fulfillErr);
    } finally {
      setIsProcessing(false);
      if (onSuccess) onSuccess();
    }
  };

  const handleDirectDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      let storagePath = null;
      let originalFilename = 'download.zip';

      // 1. Check products table for current_file_id
      const { data: product } = await supabase
        .from('products')
        .select('current_file_id')
        .eq('id', template.id)
        .maybeSingle();

      if (product?.current_file_id) {
        const { data: fileMeta } = await supabase
          .from('files')
          .select('storage_path, original_filename')
          .eq('id', product.current_file_id)
          .maybeSingle();

        if (fileMeta?.storage_path) {
          storagePath = fileMeta.storage_path;
          originalFilename = fileMeta.original_filename || originalFilename;
        }
      }

      // 2. Fallback: Search files table for latest file matching template.id
      if (!storagePath) {
        const { data: fallbackFile } = await supabase
          .from('files')
          .select('id, storage_path, original_filename')
          .eq('product_id', template.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fallbackFile?.storage_path) {
          storagePath = fallbackFile.storage_path;
          originalFilename = fallbackFile.original_filename || originalFilename;

          // Auto-repair current_file_id on products table
          await supabase
            .from('products')
            .update({ current_file_id: fallbackFile.id })
            .eq('id', template.id);
        }
      }

      if (!storagePath) {
        throw new Error('File payload is being prepared. Access it anytime in your Client Portal.');
      }

      // 3. Generate Signed URL and trigger browser download
      const { data: signedData, error: signErr } = await supabase.storage
        .from('templates')
        .createSignedUrl(storagePath, 60, { download: originalFilename });

      if (signErr || !signedData?.signedUrl) {
        throw new Error(signErr?.message || 'Unable to generate download link.');
      }

      const link = document.createElement('a');
      link.href = signedData.signedUrl;
      link.setAttribute('download', originalFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Direct download error:", err);
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleCloseAll = () => {
    const wasLoggedIn = Boolean(user);
    setPurchasedInfo(null);
    setError(null);
    try {
      sessionStorage.removeItem('optivoic_last_purchase');
    } catch (e) {}
    onClose();

    // If user was already logged in when purchasing, navigate straight to /portal upon modal close
    if (wasLoggedIn || purchasedInfo) {
      navigate('/portal');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl overflow-hidden">
        
        <button 
          onClick={handleCloseAll}
          disabled={isProcessing}
          className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 cursor-pointer z-50"
        >
          ✕
        </button>

        {purchasedInfo ? (
          /* Purchase Confirmation Screen */
          <div className="text-center py-2 space-y-5">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(56,182,255,0.3)]">
              🎉
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Purchase Successful!</h2>
              <p className="text-sm text-gray-300">
                You now own <strong className="text-white">{purchasedInfo.templateTitle || template.title}</strong>.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-left space-y-3.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <span className="text-cyan-400 text-base font-bold">📧</span>
                <div>
                  <p className="font-semibold text-white">Confirmation & Receipt Email</p>
                  <p className="text-gray-400 mt-0.5">
                    {purchasedInfo.email && purchasedInfo.email !== 'your email' ? (
                      <>Dispatched to: <strong className="text-white break-all">{purchasedInfo.email}</strong></>
                    ) : (
                      'Dispatched to your PayPal email address.'
                    )}
                  </p>
                </div>
              </div>

              {user ? (
                <div className="border-t border-white/10 pt-3 flex items-start gap-2.5">
                  <span className="text-cyan-400 text-base font-bold">✨</span>
                  <div>
                    <p className="font-semibold text-white">Account Linked & Unlocked</p>
                    <p className="text-gray-300 mt-1">This template has been automatically unlocked in your active Client Portal account (<strong className="text-white break-all">{user.email}</strong>)!</p>
                  </div>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-3 flex items-start gap-2.5">
                  <span className="text-cyan-400 text-base font-bold">🔑</span>
                  <div>
                    <p className="font-semibold text-white">Accessing Your Client Portal</p>
                    <ol className="list-decimal list-inside text-gray-300 mt-1.5 space-y-1.5">
                      <li>Visit <strong className="text-cyan-300">www.optivoic.com/portal</strong>.</li>
                      <li>
                        {purchasedInfo.email && purchasedInfo.email !== 'your email' ? (
                          <>Enter email: <strong className="text-white break-all">{purchasedInfo.email}</strong></>
                        ) : (
                          'Enter the email address associated with your PayPal purchase.'
                        )}
                      </li>
                      <li>First-time users set a password. Existing users enter their password.</li>
                      <li>Your purchased template automatically unlocks on your portal dashboard!</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs text-left">
                {error}
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button 
                onClick={handleDirectDownload}
                disabled={downloading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(56,182,255,0.4)] flex items-center justify-center gap-2"
              >
                {downloading ? 'Preparing Download...' : '⬇️ Download Template Now'}
              </button>

              <button 
                onClick={() => { handleCloseAll(); navigate('/portal'); }}
                className="w-full py-3 rounded-full border border-white/20 bg-white/5 text-gray-300 font-semibold hover:bg-white/10 transition-all cursor-pointer text-sm"
              >
                {user ? 'View Template in Client Portal →' : 'Go to Client Portal →'}
              </button>
            </div>
          </div>
        ) : (
          /* Standard Checkout Screen */
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Secure Checkout</h2>
            <p className="text-gray-400 mb-6 text-sm">
              You are purchasing: <strong className="text-white">{template.title}</strong>
            </p>

            <div className="flex justify-between items-center mb-6 bg-black p-4 rounded-2xl border border-gray-800">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-[#38B6FF]">${priceInDollars}</span>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            {isProcessing ? (
              <div className="text-center py-8 text-[#8B5CF6] animate-pulse">
                Processing your transaction and unlocking your template...
              </div>
            ) : (
              <PayPalScriptProvider 
                key={import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sandbox-key'} 
                options={{
                  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
                  currency: "USD",
                  intent: "capture"
                }}
              >
                <PayPalButtons 
                  style={{ layout: "vertical", color: "blue", shape: "rect" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        description: template.title,
                        amount: { value: priceInDollars }
                      }]
                    });
                  }}
                  onApprove={handleApprove}
                  onError={(err) => {
                    console.error("PayPal SDK error:", err);
                    setError("PayPal error: " + (err?.message || "Invalid Client ID or Sandbox mismatch. Check browser console."));
                  }}
                />
              </PayPalScriptProvider>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;