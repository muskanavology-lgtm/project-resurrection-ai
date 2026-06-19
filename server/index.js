const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRoutes = require("./routes/uploadRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Project Resurrection AI API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});