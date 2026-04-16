const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Multer setup (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB per file
});

// Test route
app.get("/", (req, res) => {
  res.send("ProtoFlexi backend running 🚀");
});

// ✅ UPDATED Quote API (handles files)
app.post('/api/quote', upload.array('files'), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    console.log("New Quote Request:", data);

    if (files && files.length > 0) {
      console.log("Uploaded files:");
      files.forEach(file => {
        console.log(`- ${file.originalname} (${file.size} bytes)`);
      });
    } else {
      console.log("No files uploaded");
    }

    // TODO:
    // 1. Upload files to S3 / storage
    // 2. OR email them using nodemailer

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
