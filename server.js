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

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));