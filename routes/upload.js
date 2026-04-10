const express = require("express");
const multer = require("multer");
const supabase = require("../config/db");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // MOCK PARSE (replace later)
    const bom = [{ part: "Resistor", qty: 10 }];
    const total = Math.floor(Math.random() * 500) + 50;

    const order = {
      id: "ORD-" + Date.now(),
      bom,
      total,
      status: "Pending"
    };

    await supabase.from("orders").insert([order]);

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});

module.exports = router;
