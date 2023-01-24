// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ProductType } from "@/contexts/ShopCart";
import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productsList } = req.body;

  const newLineItems = productsList.map((product: ProductType) => {
    return {
      price: product.defaultPriceId,
      quantity: product.quantity,
    };
  });

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!productsList) {
    return res.status(400).json({ error: "Products not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: newLineItems,
  });

  res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
