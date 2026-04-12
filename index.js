const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// File storage
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.fields([
  { name: "gerber" },
  { name: "bom" }
]), (req, res) => {
  console.log("Files:", req.files);
  console.log("Body:", req.body);

  res.json({ success: true });
});

app.listen(process.env.PORT || 10000, () =>
  console.log("Server running")
);
