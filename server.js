const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "quote@protoflexi.com",
    pass: "Musksahil0305$"
  }
});

app.post("/upload", upload.fields([
  { name: "gerber" },
  { name: "bom" }
]), async (req, res) => {
  const { name, email, quantity } = req.body;

  const gerberFile = req.files["gerber"]?.[0];
  const bomFile = req.files["bom"]?.[0];

  // SEND EMAIL
  await transporter.sendMail({
    from: "quote@protoflexi.com",
    to: "quote@protoflexi.com",
    subject: "New PCB Quote Request",
    text: `
Name: ${name}
Email: ${email}
Quantity: ${quantity}
    `,
    attachments: [
      gerberFile ? { path: gerberFile.path } : null,
      bomFile ? { path: bomFile.path } : null
    ].filter(Boolean)
  });

  res.json({ message: "Uploaded & emailed" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
