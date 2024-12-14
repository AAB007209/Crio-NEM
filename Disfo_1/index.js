const express = require("express");

require("dotenv").config();

const connectDB = require("./db/dbconfig");
const userRouter = require("./routes/users.routes");

const app = express();
const PORT = 8082;

app.use(express.json());

connectDB();

app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server lisenting on PORT:${PORT}`);
});