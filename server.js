const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// 📁 File storage
const upload = multer({ dest: "uploads/" });

// 📧 Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your@email.com",
    pass: "your-app-password" // NOT your real password
  }
});

// 💰 Simple quote calculator (same logic as frontend simplified)
function calculateQuote(data) {
  let base = 50;

  if (data.layers.includes("4")) base += 40;
  if (data.layers.includes("6")) base += 80;

  if (data.service.includes("assembly")) base += 100;

  if (data.turnaround.includes("Express")) base *= 1.25;
  if (data.turnaround.includes("Urgent")) base *= 1.5;

  return Math.round(base);
}

// 🚀 API route
app.post("/quote", upload.single("file"), async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;

    const price = calculateQuote(data);

    // ✉️ Email content
    const mailOptions = {
      from: data.email,
      to: "your@email.com",
      subject: `New PCB Quote Request - ${data.company || data.email}`,
      html: `
        <h2>New Quote Request</h2>
        <p><b>Name:</b> ${data.fname} ${data.lname}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Company:</b> ${data.company}</p>
        <p><b>Country:</b> ${data.country}</p>
        <p><b>State:</b> ${data.state}</p>
        <p><b>Layers:</b> ${data.layers}</p>
        <p><b>Quantity:</b> ${data.quantity}</p>
        <p><b>Service:</b> ${data.service}</p>
        <p><b>Turnaround:</b> ${data.turnaround}</p>
        <p><b>Description:</b> ${data.description}</p>
        <p><b>Estimated Price:</b> $${price} AUD</p>
      `,
      attachments: file
        ? [{ filename: file.originalname, path: file.path }]
        : []
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, price });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// 🌐 Start server
app.listen(3000, () => console.log("Server running on port 3000"));
