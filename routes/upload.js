const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });
const { processBOM } = require("../services/bomService");

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await processBOM(req.file.path);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;