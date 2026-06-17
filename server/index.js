require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");
const explainRoutes = require("./routes/explainRoutes");
const connectDB = require("./config/db");
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api", explainRoutes);
app.use("/api/ai", require("./routes/aiRoutes"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Project Resurrection AI API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});