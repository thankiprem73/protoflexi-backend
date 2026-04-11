const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

// IMPORTANT: create uploads folder safely
const upload = multer({ dest: "/tmp" }); // Render-safe (NOT local folder)

// HEALTH CHECK (Render needs this)
app.get("/", (req, res) => {
  res.send("✅ PCB Backend Running");
});

// SAFE UPLOAD ROUTE (NO EMAIL YET)
app.post("/upload", upload.fields([
  { name: "gerber" },
  { name: "bom" }
]), (req, res) => {
  try {
    const { name, email, quantity } = req.body;

    console.log("New request:");
    console.log({ name, email, quantity });

    res.json({ message: "Upload received" });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Server failed" });
  }
});

// CRITICAL: Render dynamic port
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
