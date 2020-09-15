const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const docs = require("./docs/home.json");
app.get("/", (req, res) => {
  res.send(docs);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
