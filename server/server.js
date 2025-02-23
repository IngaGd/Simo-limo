require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.set("trust proxy", true);

app.use((req, res, next) => {
  req.userIp = req.ip;
  next();
});

const corsOptions = {
  origin: ["http://localhost:5173"],
  //origin: [`http://${process.env.SERVER_URL}:${port}`],
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        //"img-src": ["'none'"],
        "connect-src": ["'self'", "https://sheets.googleapis.com"],
      },
    },
  })
);

//Routes
app.use("/api", require("./routes/products"));
app.use("/api", require("./routes/orders"));
app.use("/api", require("./routes/payments"));
app.use("/api", require("./routes/paymentStatuses"));
app.use("/api", require("./routes/notifications"));

// app.post("/api/payment-notification", async (req, res) => {
//   console.log("raw payment-notification body: ", req.body);
//   try {
//     const paymentData = JSON.parse(req.body.json);
//     const { status, reference, transaction } = paymentData;
//     console.log(
//       `Payment Notification - Status: ${status}, Reference: ${reference}, Transaction ID: ${transaction}`
//     );

//     const updatePaymentData = await fetch(
//       process.env.PAYMENT_STATUS_UPDATE_URL,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status, reference, transaction }),
//       }
//     );
//     const updateResult = await updatePaymentData.json();
//     console.log("Update Response: ", updateResult);

//     res.status(200).send("OK");
//   } catch (error) {
//     console.error("Error in notification post", error);
//     res.status(400).send("Invalid notification data");
//   }
// });

app.use(express.static(path.join(__dirname, "../limo-shop-app/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../limo-shop-app/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
});
