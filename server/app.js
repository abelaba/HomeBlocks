const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/uploads/", express.static("uploads"));

// * IMPORT ROUTES
const authRoute = require("./routes/auth");
const rentingRoute = require("./routes/renting");
const chatRoute = require("./routes/chat.js");

app.use("/api/user", authRoute);
app.use("/api/rental", rentingRoute);
app.use("/api/chat", chatRoute);

module.exports = app;
