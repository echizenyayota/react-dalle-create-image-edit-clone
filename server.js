const PORT = 8000;
const OpenAI  = require("openai");
const express = require("express");

require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log("file");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works",
  }); 
});

app.post("/image_edit", async (req, res) => {
  try {
    const response = await openai.images.edit({
      image: fs.createReadStream("otter.png"),
      prompt: "A cute baby sea otter wearing a beret",
    });
    console.log(response.data);
    res.send(response.data);
  } catch(error) {
    console.error(error);
  }
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if(err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if(err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
  });
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));