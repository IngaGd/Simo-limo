const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 80;

const corsOptions = {
  origin: "http://wdp.lt/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../limo-shop-app/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../limo-shop-app/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`App is listening op port: ${port}`);
});
