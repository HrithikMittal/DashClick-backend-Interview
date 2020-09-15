const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("📦 DB is connected successfully!");
  })
  .catch((err) => {
    console.log("Error in connecting to the DB", err);
  });

app.use(bodyParser.json());

const adminRoute = require("./routes/Admin");
app.use("/admin", adminRoute);

const docs = require("./docs/home.json");
app.get("/", (req, res) => {
  res.send(docs);
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on ${port}`);
});
