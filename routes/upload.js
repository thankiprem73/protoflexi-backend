// routes/upload.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const { processBOM } = require("../services/bomService");

router.post("/", upload.single("file"), async (req, res) => {
  const result = await processBOM(req.file.path);
  res.json(result);
});

module.exports = router;
