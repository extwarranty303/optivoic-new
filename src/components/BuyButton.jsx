import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

/**
 * Reusable "Buy Now" button that encapsulates the entire purchase flow:
 *   1️⃣ Open CheckoutModal (PayPal)
 *   2️⃣ After successful payment, open AuthModal for portal access
 *   3️⃣ On auth completion, redirect to the client portal
 *
 * By centralising this logic, any template-card can simply import <BuyButton>
 * and automatically gain the up-to-date flow.
 */
export default function BuyButton({
  template,
  redirectTo = '/portal',
  className,
  children,
  user = null
}) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  // Open the checkout modal when the button is clicked
  const startPurchase = (e) => {
    if (e) e.stopPropagation();
    setIsCheckoutOpen(true);
  };

  // Called after user finishes with the Purchase Confirmation Screen in CheckoutModal
  const handlePurchaseSuccess = () => {
    setIsCheckoutOpen(false);
    if (!user) {
      setIsAuthOpen(true);
    } else {
      navigate(redirectTo);
    }
  };

  // When AuthModal finishes (login or account creation) we navigate
  const handleAuthClose = () => {
    setIsAuthOpen(false);
    navigate(redirectTo);
  };

  const priceDisplay = template?.price_cents 
    ? (template.price_cents / 100).toFixed(2)
    : (template?.price || '99.00');

  return (
    <>
      <button
        onClick={startPurchase}
        className={
          className ||
          "w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-lg py-4 px-8 rounded-full hover:shadow-[0_0_30px_rgba(56,182,255,0.4)] transition-all cursor-pointer"
        }
      >
        {children || `Buy Now $${priceDisplay}`}
      </button>

      {template && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          template={template}
          user={user}
          onSuccess={handlePurchaseSuccess}
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleAuthClose}
        redirectTo={redirectTo}
      />
    </>
  );
}
