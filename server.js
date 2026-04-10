require("dotenv").config();
const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const paymentRoute = require("./routes/payment");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/payment", paymentRoute);

app.listen(5000, () => console.log("Server running"));
