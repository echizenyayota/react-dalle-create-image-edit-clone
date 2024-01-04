const PORT = 8000;

require("dotenv").config();

const OpenAI = require("openai");
const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works"
  });
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));