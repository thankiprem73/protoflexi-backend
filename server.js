const express = require('express');
const cors = require('cors');

const app = express(); // ✅ MUST come before using app

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("ProtoFlexi backend running 🚀");
});

// Quote API
app.post('/api/quote', async (req, res) => {
  try {
    const data = req.body;

    console.log("New Quote Request:", data);

    // TODO: send email or save to DB here

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Port (Render requires this)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
