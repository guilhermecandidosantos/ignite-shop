import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '../../lib/stripe';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { priceIdArray } = req.body;
  
  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  if(!priceIdArray) {
    return res.status(400).json({ error: 'Price not found' });
  }
  
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const lineItems = priceIdArray.map((item) => {
    return {
      price: item,
      quantity: 1,
    };
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url 
  });
}