require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const discussionRoutes = require("./routes/discussion.routes");
const authRouter = require("./routes/auth.routes");
const mongoose = require("mongoose");

const DB_URI = "mongodb://127.0.0.1:27017";

const app = express();
const PORT = 8082;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

// Adds CORS Headers: (Access control allow methods, etc)
// app.use(cors()); // For Some reason not working
app.use(cors({
  origin: "http://localhost:8081",
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/discussion", discussionRoutes);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});
