const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.post("/quote", (req, res) => {
  console.log("Incoming quote:", req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
