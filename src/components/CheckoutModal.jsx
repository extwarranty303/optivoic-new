import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../supabaseClient';
import { sendPurchaseEmail } from '../utils/purchaseEmail';

const CheckoutModal = ({ isOpen, onClose, template, user, onSuccess }) => {
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !template) return null;

  // Convert cents to standard dollar format for PayPal
  const priceInDollars = (template.price_cents / 100).toFixed(2);

  const handleApprove = async (data, actions) => {
    setIsProcessing(true);
    setError(null);

    try {
      // The client's only job is to get the approved PayPal Order ID.
      // All verification and database operations will happen securely on the backend.
      const paypalOrderId = data.orderID;

      // Invoke the 'process-order' Supabase Edge Function
      const { data: functionData, error: functionError } = await supabase.functions.invoke('process-order', {
        body: { 
          orderId: paypalOrderId,
          productId: template.id 
        },
      });

      if (functionError) {
        // This error could be from network issues or a problem within the function itself.
        throw new Error(functionData?.error || functionError.message);
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
      </div>
    </div>
  );
};

export default CheckoutModal;