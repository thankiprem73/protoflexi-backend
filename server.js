const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());

// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// EMAIL CONFIG (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use App Password (NOT normal password)
  },
});

// ROUTE
app.post("/api/quote", upload.array("files"), async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      company,
      country,
      state,
      layers,
      qty,
      service,
      lead,
      desc,
    } = req.body;

    const files = req.files;

    const attachments = files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    await transporter.sendMail({
      from: `"PROTOFLEXI" <${process.env.EMAIL_USER}>`,
      to: "yourbusiness@email.com",
      subject: `New PCB Quote Request - ${fname} ${lname}`,
      html: `
        <h3>New Quote Request</h3>
        <p><b>Name:</b> ${fname} ${lname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Country:</b> ${country}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Layers:</b> ${layers}</p>
        <p><b>Quantity:</b> ${qty}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Lead:</b> ${lead}</p>
        <p><b>Description:</b> ${desc}</p>
      `,
      attachments,
    });

    res.json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
