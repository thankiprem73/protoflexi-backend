const express = require("express");
const supabase = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).send(error);

  res.json(data);
});

module.exports = router;
