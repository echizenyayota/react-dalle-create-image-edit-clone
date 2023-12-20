const PORT = 8000;
const express = require("express");

require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works",
  }); 
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));