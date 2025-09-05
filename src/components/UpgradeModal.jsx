import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Crown, X, Check, Sparkles, Key, RefreshCw, CreditCard } from 'lucide-react';
import { createCheckoutSession, redirectToCheckout, PRICING } from '../services/stripe';

const features = [
  {
    icon: Sparkles,
    title: 'Unlimited Bio Generation',
    description: 'Create as many bio variations as you need',
  },
  {
    icon: Key,
    title: 'Advanced Keyword Analysis',
    description: 'AI-powered keyword suggestions for better discoverability',
  },
  {
    icon: RefreshCw,
    title: 'Bio Refinement',
    description: 'Continuously improve and refine your bio with AI feedback',
  },
];

export default function UpgradeModal() {
  const { state, dispatch } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  if (!state.ui.showUpgradeModal) return null;

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_UPGRADE_MODAL' });
  };

  const handleUpgrade = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessing(true);
    try {
      const session = await createCheckoutSession(
        PRICING.PREMIUM_MONTHLY.priceId,
        email
      );

      if (session.sessionId === 'cs_demo_session_id') {
        // Demo mode - simulate successful upgrade
        dispatch({ type: 'UPGRADE_USER' });
        alert('🎉 Welcome to Premium! You now have access to all advanced features.');
      } else {
        // Real Stripe checkout
        await redirectToCheckout(session.sessionId);
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to process upgrade. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-6 relative animate-slide-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary rounded-full text-white font-medium mb-4">
            <Crown className="h-5 w-5" />
            Premium Plan
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Unlock Advanced Features</h2>
          <p className="text-white/80">
            Take your LinkedIn profile to the next level with AI-powered optimization.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg shrink-0">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white">{feature.title}</h4>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-white mb-1">$15<span className="text-lg text-white/60">/month</span></div>
          <p className="text-white/60 text-sm">Cancel anytime. No hidden fees.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleUpgrade}
            disabled={isProcessing || !email}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Upgrade to Premium
              </>
            )}
          </button>
          <button
            onClick={handleClose}
            className="w-full btn-secondary py-3"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-xs text-white/60 text-center mt-4">
          This is a demo. No actual payment will be processed.
        </p>
      </div>
    </div>
  );
}
