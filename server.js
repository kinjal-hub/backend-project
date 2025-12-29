const express = require("express");
const connectToDatabase = require("./config/db");
const imageRoutes = require("./Routes/imageRoutes");
const timeoutMiddleware = require("./Middleware/settimeout")
require("dotenv").config();


const app = express();
const PORT = process.env.PORT;

// Connect to Database
connectToDatabase();

app.use(express.json());


// Routes
app.use("/api/images", timeoutMiddleware, imageRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
