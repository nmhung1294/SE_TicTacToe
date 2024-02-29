const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 8000;

app.get("/login", (req, res) => {
  res.send("<h1>Welcome to the login page!</h1>");
});

app.get("/signup", (req, res) => {
  res.send("<h1>Welcome to the signup page!</h1>");
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the homepage!</h1>");
});

app.use(cors(process.env.FRONTEND_URL));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
