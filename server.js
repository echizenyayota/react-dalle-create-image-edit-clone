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

const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log('file', file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works"
  });
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if(err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
  });
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));