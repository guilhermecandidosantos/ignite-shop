import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(apiKey,{
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: 'Ignite Shop'
  }
});