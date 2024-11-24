const express = require("express");
const userRouter = require("./routes/users.routes")
const currenciesRouter = require("./routes/currencies.routes")

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
    res.send("<h1>Currency and User Database</h1>");
});

// Two main Routes defined here
app.use("/currencies", currenciesRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server lisenting on PORT:${PORT}`);
});