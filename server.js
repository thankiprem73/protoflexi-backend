const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// Health check
app.get("/", (req, res) => {
  res.send("PCB Backend Running");
});

// Upload API
app.post("/upload", upload.fields([
  { name: "gerber" },
  { name: "bom" }
]), (req, res) => {
  const { name, email, quantity } = req.body;

  console.log("New Quote Request:");
  console.log(name, email, quantity);

  res.json({
    status: "success",
    message: "Quote received"
  });
});

// Render safe port
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
