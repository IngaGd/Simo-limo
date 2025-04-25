require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

app.set("trust proxy", true);

app.use((req, res, next) => {
  req.userIp = req.ip;
  next();
});

const corsOptions = {
  origin: [`${process.env.SERVER_URL}`],
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json({ extended: false }));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'"],
        "connect-src": ["'self'", "https://sheets.googleapis.com"],
      },
    },
  })
);
app.use(cookieParser());

//Routes
app.use("/api", require("./routes/products"));
app.use("/api", require("./routes/csrfToken"));
app.use("/api", require("./routes/userMessage"));
app.use("/api", require("./routes/orders"));
app.use("/api", require("./routes/payments"));
app.use("/api", require("./routes/notifications"));
app.use("/api", require("./routes/paymentStatuses"));

app.use(express.static(path.join(__dirname, "../limo-shop-app/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../limo-shop-app/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
});
