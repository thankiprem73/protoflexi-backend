// routes/payment.js
const express = require("express");
const router = express.Router();
const { createCheckout } = require("../services/stripeService");

router.post("/", async (req, res) => {
  const { amount } = req.body;
  const session = await createCheckout(amount);
  res.json({ url: session.url });
});

module.exports = router;
