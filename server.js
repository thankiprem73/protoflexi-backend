const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// Test route
app.get("/", (req, res) => {
  res.send("PCB Backend Running");
});

// Email config (safe)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your@email.com",
    pass: "your-app-password"
  }
});

app.post("/upload", upload.fields([
  { name: "gerber" },
  { name: "bom" }
]), async (req, res) => {
  try {
    const { name, email, quantity } = req.body;

    await transporter.sendMail({
      from: "your@email.com",
      to: "your@email.com",
      subject: "New PCB Quote Request",
      text: `Name: ${name}, Email: ${email}, Quantity: ${quantity}`
    });

    res.json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
