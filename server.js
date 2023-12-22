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
let filePath;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works",
  }); 
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if(err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if(err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
  });
});

app.post("/edit_image", async (req, res) => {
  try {
    const response = await openai.images.edit({
      image: fs.createReadStream(filePath),
      prompt: req.body.message,
    });
    console.log(response.data);
    res.send(response.data);
  } catch(error) {
    console.error(error);
  }
});



app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));