const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

async function createCheckout(amount) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: { name: "PCB Order" },
          unit_amount: amount * 100
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL
  });
}

module.exports = { createCheckout };