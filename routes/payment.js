const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

router.post("/checkout", async (req, res) => {
  const { total } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "PCB Order"
          },
          unit_amount: total * 100
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: "https://your-frontend.vercel.app/dashboard",
    cancel_url: "https://your-frontend.vercel.app/upload"
  });

  res.json({ url: session.url });
});

module.exports = router;
