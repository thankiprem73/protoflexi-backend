const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());

// File storage
const upload = multer({ dest: "uploads/" });

app.post("/send-quote", upload.array("files"), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your@email.com",
        pass: "your_app_password"
      }
    });

    // Attach files
    const attachments = files.map(file => ({
      filename: file.originalname,
      path: file.path
    }));

    const mailOptions = {
      from: data.email,
      to: "your@email.com",
      subject: `New Quote Request – ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}

Location: ${data.country}, ${data.state}

Project:
Layers: ${data.layers}
Quantity: ${data.quantity}
Service: ${data.service}
Turnaround: ${data.turnaround}

Auto Quote:
Total: ${data.quote_total}
Per Board: ${data.per_board}

Description:
${data.description}
      `,
      attachments
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
