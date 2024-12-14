const express = require("express");

// We need this below line for the secret keys management from .env file with dotenv module
require("dotenv").config();

const userRouter = require("./routes/users.routes")
const currenciesRouter = require("./routes/currencies.routes")
const verifyAuth = require("./middleware/verifyAuth");
const blogsRouter = require("./routes/blogs.routes");

// MongoDB 
const connectDB = require("./db/config")

const app = express();
const PORT = 8082;

// This is available from versions above > 4.16
// In older versions body_parser package was needed for this explicitly
app.use(express.json()); // looking for the request header which contains content-type: application/json

connectDB(); // Calling the MongoDB function

// app.use(verifyAuth);

app.get("/", (req, res) => {
  res.send("<h1>Currency and User Database</h1>");
});

// Three main Routes defined here
app.use("/currencies", currenciesRouter);
app.use("/users", userRouter);
app.use("/blogs", blogsRouter);

app.listen(PORT, () => {
  console.log(`Server lisenting on PORT:${PORT}`);
});





// - Learnings
/*
- Express by default ignores the body. We need to parse the body to see the request body in the log.
- In index.js file we need to do app.use(express.json() -> middleware

Server lisenting on PORT:8082
DB Connection Successfull
{
  title: 'AWS Blog',
  authors: [ 'John Doe', 'Janice' ],
  content: 'Very good Blog for AWS',
  publishedAt: null
}

- If we send the Content-type as text/plain or something the body won't be parsed and logged.
{} -> Empty object

*/