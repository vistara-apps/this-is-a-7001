import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

export { stripePromise };

/**
 * Create a Stripe checkout session for premium subscription
 * @param {string} priceId - Stripe price ID for the subscription
 * @param {string} customerEmail - Customer email address
 * @returns {Promise<{sessionId: string}>} - Checkout session ID
 */
export async function createCheckoutSession(priceId, customerEmail) {
  // Demo implementation - in production, this would call your backend API
  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'pk_test_demo') {
    // Return mock session for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sessionId: 'cs_demo_session_id',
          url: '#demo-checkout'
        });
      }, 1000);
    });
  }

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerEmail,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw new Error('Failed to initiate payment. Please try again.');
  }
}

/**
 * Redirect to Stripe checkout
 * @param {string} sessionId - Stripe checkout session ID
 */
export async function redirectToCheckout(sessionId) {
  const stripe = await stripePromise;
  
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  // Demo mode - just show success message
  if (sessionId === 'cs_demo_session_id') {
    return { error: null };
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    console.error('Stripe redirect error:', error);
    throw new Error(error.message);
  }
}

/**
 * Create a one-time payment for bio optimization
 * @param {number} amount - Amount in cents
 * @param {string} customerEmail - Customer email
 * @returns {Promise<{clientSecret: string}>} - Payment intent client secret
 */
export async function createPaymentIntent(amount, customerEmail) {
  // Demo implementation
  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'pk_test_demo') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          clientSecret: 'pi_demo_client_secret',
          amount: amount
        });
      }, 1000);
    });
  }

  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        customerEmail,
        currency: 'usd',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const paymentIntent = await response.json();
    return paymentIntent;
  } catch (error) {
    console.error('Payment intent error:', error);
    throw new Error('Failed to initiate payment. Please try again.');
  }
}

/**
 * Pricing configuration
 */
export const PRICING = {
  PREMIUM_MONTHLY: {
    priceId: 'price_premium_monthly',
    amount: 1500, // $15.00 in cents
    currency: 'usd',
    interval: 'month',
    name: 'Premium Monthly'
  },
  ONE_TIME_OPTIMIZATION: {
    amount: 2500, // $25.00 in cents
    currency: 'usd',
    name: 'Bio Optimization Report'
  },
  KEYWORD_ANALYSIS: {
    amount: 500, // $5.00 in cents
    currency: 'usd',
    name: 'Keyword Analysis'
  }
};
