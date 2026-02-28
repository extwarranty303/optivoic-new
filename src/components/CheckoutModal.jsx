import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../../supabaseClient';
import Footer from './Footer';

const CheckoutModal = ({ isOpen, onClose, template, user, onSuccess }) => {
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !template) return null;

  // Convert cents to standard dollar format for PayPal
  const priceInDollars = (template.price_cents / 100).toFixed(2);

  const handleApprove = async (data, actions) => {
    try {
      setIsProcessing(true);
      
      // 1. Capture the funds via PayPal
      const details = await actions.order.capture();
      const transactionId = details.purchase_units[0].payments.captures[0].id;

      // 2. Create the Order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          paypal_transaction_id: transactionId,
          total_amount_cents: template.price_cents,
          status: 'completed'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Create the Purchase access record in Supabase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert([{
          order_id: orderData.id,
          product_id: template.id,
          user_id: user.id
        }]);

      if (purchaseError) {
        // Note: If this fails but the order succeeded, you'd handle it via admin review
        console.error("Purchase record failed, but order was captured:", purchaseError);
        throw new Error("Payment succeeded, but we couldn't unlock the template. Please contact support.");
      }

      // 4. Success! Close modal and notify parent
      onSuccess();
      onClose();

    } catch (err) {
      console.error("Checkout Error:", err);
      setError(err.message || "An error occurred during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#121212] border border-gray-800 rounded-xl p-8 max-w-md w-full relative shadow-2xl">
        
        <button 
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Secure Checkout</h2>
        <p className="text-gray-400 mb-6 text-sm">
          You are purchasing: <strong className="text-white">{template.title}</strong>
        </p>

        <div className="flex justify-between items-center mb-6 bg-black p-4 rounded border border-gray-800">
          <span className="text-gray-400">Total</span>
          <span className="text-2xl font-bold text-[#38B6FF]">${priceInDollars}</span>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {isProcessing ? (
          <div className="text-center py-8 text-[#8B5CF6] animate-pulse">
            Processing your transaction and unlocking your template...
          </div>
        ) : (
          <PayPalScriptProvider options={{ 
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", // Replace with your real Client ID in your .env file
            currency: "USD" 
          }}>
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
              onError={() => setError("PayPal encountered an error. Please try again.")}
            />
          </PayPalScriptProvider>
        )}
      </div>
      {/* Footer */}
      <Footer />  
    </div>
  );
};

export default CheckoutModal;