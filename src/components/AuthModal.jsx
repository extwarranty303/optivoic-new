import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose, redirectTo, subtitle }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email entry, Step 2: Password entry
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [hasPurchases, setHasPurchases] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isResetMode, setIsResetMode] = useState(false);
  const [isAccountCreatedSuccess, setIsAccountCreatedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const checkExistingSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          onClose();
          navigate(redirectTo || '/portal');
        }
      };
      checkExistingSession();
    }
  }, [isOpen, navigate, onClose, redirectTo]);

  if (!isOpen) return null;

  // Step 1: Smart Email Check
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // 1. Check if email has any purchase entitlements in Supabase
      const { data: purchaseData } = await supabase
        .from('purchases')
        .select('id, user_id')
        .ilike('user_email', cleanEmail);

      const foundPurchases = Boolean(purchaseData && purchaseData.length > 0);
      const hasAccount = Boolean(purchaseData && purchaseData.some(p => p.user_id !== null && p.user_id !== ''));

      setHasPurchases(foundPurchases);
      if (hasAccount) {
        setIsExistingUser(true);
      } else {
        setIsExistingUser(false);
      }

      setStep(2);
    } catch (err) {
      console.error("Email check error:", err);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Adaptive Sign In or Configure Password
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (isResetMode) {
        // Password Reset Mode
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/update-password`,
        });
        if (error) throw error;
        setMessage({ text: 'Password reset link sent! Check your email inbox.', type: 'success' });
        return;
      }

      // Try Signing In First
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (!signInError && signInData?.session) {
        setMessage({ text: 'Successfully authenticated! Redirecting...', type: 'success' });
        setTimeout(() => {
          onClose();
          navigate(redirectTo || '/portal');
        }, 800);
        return;
      }

      // If sign in failed because user does not exist yet (or is new guest buyer), attempt automatic Sign Up / Password Setup
      if (signInError && (signInError.message.includes('Invalid login credentials') || signInError.message.includes('user_not_found'))) {
        
        // Attempt Sign Up to set initial password
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password
        });

        if (signUpError) {
          // If already registered, password was wrong
          if (signUpError.message.includes('User already registered') || signUpError.message.includes('already exists')) {
            setIsExistingUser(true);
            throw new Error('Incorrect password for this email account. Click "Forgot Password" to reset it.');
          }
          throw signUpError;
        }

        // Sign Up Success!
        if (signUpData) {
          setMessage({ text: 'Account created! Redirecting to your OptiVoic Portal...', type: 'success' });
          setTimeout(() => {
            onClose();
            navigate(redirectTo || '/portal');
          }, 800);
          return;
        }
      }

      // Other sign in error
      throw signInError;

    } catch (error) {
      console.error("Auth Error:", error);
      let errorMsg = error.message || 'Authentication error. Please try again.';

      if (cleanEmail.includes('.example.com') || cleanEmail.includes('example.org')) {
        errorMsg = `PayPal Sandbox test email (${cleanEmail}) uses PayPal's fake domain (.example.com). Please enter your real email (or a standard email like yourname@gmail.com) to create your portal password. All your PayPal purchases will still link automatically!`;
      }

      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetModalState = () => {
    setStep(1);
    setEmail('');
    setPassword('');
    setIsExistingUser(false);
    setHasPurchases(false);
    setMessage({ text: '', type: '' });
    setIsResetMode(false);
    setIsAccountCreatedSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300" onClick={handleResetModalState}>
      <div className="bg-white/[0.05] border border-white/20 backdrop-blur-3xl rounded-3xl max-w-sm w-full p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/20 blur-[60px] pointer-events-none"></div>

        <button onClick={handleResetModalState} className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-full transition-all backdrop-blur-md z-[200] cursor-pointer">
          ✕
        </button>

        {/* DEDICATED CONFIRMATION SCREEN ON ACCOUNT CREATION */}
        {isAccountCreatedSuccess ? (
          <div className="text-center py-2 space-y-5 relative z-10">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(56,182,255,0.3)]">
              ✉️
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-1.5 tracking-tight">Account Created!</h2>
              <p className="text-sm text-gray-300">
                We sent a confirmation link to <strong className="text-white break-all">{email}</strong>.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-left space-y-2 text-xs text-gray-300">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-cyan-400 font-bold">📩</span> Next Steps:
              </p>
              <p className="text-gray-400 leading-relaxed">
                Check your inbox and click the confirmation link to activate your account and jump straight to your OptiVoic Portal.
              </p>
            </div>

            <button 
              onClick={handleResetModalState} 
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all cursor-pointer text-sm"
            >
              Done
            </button>
          </div>
        ) : step === 1 ? (
          /* STEP 1: Enter Email */
          <form onSubmit={handleCheckEmail} className="relative z-10 space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                {subtitle ? 'Save to Knowledge Vault' : 'Access Portal'}
              </h2>
              <p className="text-gray-400 text-sm">
                {subtitle || 'Enter the email address associated with your purchases.'}
              </p>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1.5">
                  Log in or create a free account to save articles across all your devices.
                </p>
              )}
            </div>

            {message.text && (
              <div className={`p-3 rounded-xl text-xs ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                {message.text}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-400/50 text-sm"
                placeholder="name@company.com"
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !email.trim()} 
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-base py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(56,182,255,0.4)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Checking Account...' : 'Continue →'}
            </button>
          </form>
        ) : (
          /* STEP 2: Password Setup or Sign In */
          <form onSubmit={handleAuthSubmit} className="relative z-10 space-y-5">
            <div>
              <button 
                type="button" 
                onClick={() => { setStep(1); setMessage({text:'', type:''}); }}
                className="text-xs text-cyan-400 hover:text-cyan-300 mb-3 flex items-center gap-1 cursor-pointer"
              >
                ← Change Email ({email})
              </button>

              <h2 className="text-2xl font-black text-white mb-1.5 tracking-tight">
                {isResetMode ? 'Reset Password' : isExistingUser ? 'Welcome Back' : 'Enter Password'}
              </h2>

              <p className="text-gray-400 text-xs leading-relaxed">
                {isResetMode ? (
                  'We will send a password reset link to your email.'
                ) : isExistingUser ? (
                  `Enter password for ${email} to view your OptiVoic Portal.`
                ) : (
                  `Enter your password for ${email} to unlock your portal.`
                )}
              </p>
            </div>

            {message.text && (
              <div className={`p-3 rounded-xl text-xs ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                {message.text}
              </div>
            )}

            {!isResetMode && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Password
                  </label>
                  <button 
                    type="button" 
                    onClick={() => { setIsResetMode(true); setMessage({text:'', type:''}); }} 
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-400/50 text-sm"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-base py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(56,182,255,0.4)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : isResetMode ? 'Send Reset Link' : isExistingUser ? 'Sign In →' : 'Sign In / Set Password →'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}