import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../supabaseClient';

const CheckoutModal = ({ isOpen, onClose, template, user, onSuccess, initialPurchasedInfo, initialPromoCode = '' }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedInfo, setPurchasedInfo] = useState(initialPurchasedInfo || null);
  const [downloading, setDownloading] = useState(false);

  const [promoInput, setPromoInput] = useState(initialPromoCode || '');
  const [appliedDiscount, setAppliedDiscount] = useState(
    initialPromoCode.trim().toUpperCase() === 'PORTAL15' ? 0.15 : 0
  );
  const [promoMessage, setPromoMessage] = useState(
    initialPromoCode.trim().toUpperCase() === 'PORTAL15' ? '✨ 15% Member Discount Applied!' : ''
  );

  useEffect(() => {
    if (initialPurchasedInfo) {
      setPurchasedInfo(initialPurchasedInfo);
    }
  }, [initialPurchasedInfo]);

  useEffect(() => {
    if (initialPromoCode.trim().toUpperCase() === 'PORTAL15') {
      setPromoInput('PORTAL15');
      setAppliedDiscount(0.15);
      setPromoMessage('✨ 15% Member Discount Applied!');
    }
  }, [initialPromoCode]);

  if (!isOpen || !template) return null;

  const rawOriginalPrice = (template.price_cents || 9900) / 100;
  const originalPriceDollars = rawOriginalPrice.toFixed(2);
  const savingsDollars = (rawOriginalPrice * appliedDiscount).toFixed(2);
  const priceInDollars = (rawOriginalPrice * (1 - appliedDiscount)).toFixed(2);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'PORTAL15') {
      setAppliedDiscount(0.15);
      setPromoMessage('✨ 15% Member Discount Applied!');
    } else if (cleanCode === '') {
      setAppliedDiscount(0);
      setPromoMessage('');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid promo code. Try PORTAL15 for 15% off.');
    }
  };

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
      const { data: purchaseData, error: dbErr } = await supabase
        .from('purchases')
        .insert({
          user_id: user?.id || null,
          user_email: finalEmail,
          template_id: template.id,
          product_id: template.id,
          title: template.title,
          paypal_order_id: paypalOrderId,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (dbErr) {
        console.warn("Supabase record warning:", dbErr.message);
      }

      if (onSuccess) {
        onSuccess(purchaseData || successPayload);
      }
    } catch (err) {
      console.error("Post-checkout handling notice:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDirectDownload = async () => {
    if (!template || !template.id) {
      setError("Template metadata missing.");
      return;
    }

    setDownloading(true);
    setError(null);

    try {
      let fileRecord = null;

      // 1. Check if product has current_file_id
      if (template.current_file_id) {
        const { data: directFile } = await supabase
          .from('files')
          .select('*')
          .eq('id', template.current_file_id)
          .maybeSingle();

        if (directFile) {
          fileRecord = directFile;
        }
      }

      // 2. Search files table matching product_id
      if (!fileRecord) {
        const { data: productFiles } = await supabase
          .from('files')
          .select('*')
          .eq('product_id', template.id)
          .order('created_at', { ascending: false });

        if (productFiles && productFiles.length > 0) {
          fileRecord = productFiles[0];
        }
      }

      // 3. Search Storage Bucket directly
      let storagePath = null;
      let originalFilename = `${template.title.replace(/[^a-zA-Z0-9]/g, '_')}.zip`;

      if (fileRecord && fileRecord.storage_path) {
        storagePath = fileRecord.storage_path;
        originalFilename = fileRecord.original_filename || fileRecord.filename || originalFilename;
      } else {
        const { data: bucketFiles, error: bucketErr } = await supabase
          .storage
          .from('templates')
          .list('', { limit: 100 });

        if (!bucketErr && bucketFiles && bucketFiles.length > 0) {
          const match = bucketFiles.find(f => 
            f.name.toLowerCase().includes(String(template.id).toLowerCase()) ||
            f.name.toLowerCase().includes(template.title.toLowerCase())
          ) || bucketFiles[0];

          if (match) {
            storagePath = match.name;
            originalFilename = match.name;
          }
        }
      }

      if (!storagePath) {
        throw new Error('File payload is being prepared. Access it anytime in your OptiVoic Portal.');
      }

      // 4. Generate Signed URL and trigger browser download
      const { data: signedData, error: signErr } = await supabase.storage
        .from('templates')
        .createSignedUrl(storagePath, 60, {
          download: originalFilename
        });

      if (signErr || !signedData?.signedUrl) {
        throw new Error(signErr?.message || "Unable to generate download link.");
      }

      const link = document.createElement('a');
      link.href = signedData.signedUrl;
      link.setAttribute('download', originalFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("Direct download error:", err);
      setError(`Download notice: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handleCloseAll = () => {
    setPurchasedInfo(null);
    setError(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-[#0D0D12] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={handleCloseAll}
          className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
        >
          ✕
        </button>

        {purchasedInfo ? (
          /* PURCHASE SUCCESS CONFIRMATION SCREEN */
          <div className="space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Payment Confirmed & Asset Unlocked
            </div>

            <h2 className="text-2xl font-black text-white leading-tight">
              Thank You for Your Order!
            </h2>

            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Template Unlocked:</span>
                <strong className="text-white">{purchasedInfo.templateTitle}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">PayPal Order ID:</span>
                <strong className="text-cyan-300 font-mono">{purchasedInfo.orderId}</strong>
              </div>
              
              {user ? (
                <div className="border-t border-white/10 pt-3 flex items-start gap-2.5">
                  <span className="text-cyan-400 text-base font-bold">✨</span>
                  <div>
                    <p className="font-semibold text-white">Account Linked & Unlocked</p>
                    <p className="text-gray-300 mt-1">This template has been automatically unlocked in your active OptiVoic Portal account (<strong className="text-white break-all">{user.email}</strong>)!</p>
                  </div>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-3 flex items-start gap-2.5">
                  <span className="text-cyan-400 text-base font-bold">🔑</span>
                  <div>
                    <p className="font-semibold text-white">Accessing Your OptiVoic Portal</p>
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
                {user ? 'View Template in OptiVoic Portal →' : 'Go to OptiVoic Portal →'}
              </button>
            </div>
          </div>
        ) : (
          /* Standard Checkout Screen */
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Secure Checkout</h2>
            <p className="text-gray-400 mb-5 text-sm">
              You are purchasing: <strong className="text-white">{template.title}</strong>
            </p>

            <div className="bg-black/60 p-4 rounded-2xl border border-gray-800 mb-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Original Price</span>
                <span className={`font-bold ${appliedDiscount > 0 ? 'line-through text-gray-500 text-sm' : 'text-xl text-[#38B6FF]'}`}>
                  ${originalPriceDollars}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-400">15% Member Discount</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">Save -${savingsDollars}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-sm font-bold text-white">Your Discounted Price</span>
                    <span className="text-2xl font-black text-emerald-400">${priceInDollars}</span>
                  </div>
                </div>
              )}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                <input 
                  type="text" 
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo Code (e.g. PORTAL15)"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-cyan-400"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] font-semibold ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {promoMessage}
                </p>
              )}
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
                        description: `${template.title} (Member Discount Applied)`,
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