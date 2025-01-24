require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

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
        "img-src": ["'none'"],
        "connect-src": ["'self'", "googleapis.com"],
      },
    },
  })
);

const pathToJson = path.join(__dirname, "limo.json");
const credentials = JSON.parse(fs.readFileSync(pathToJson));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const PRODUCT_LIST_ID = process.env.PRODUCT_LIST_SPREADSHEET_ID;
console.log("Spreadsheet ID:", PRODUCT_LIST_ID);

app.get("/api/products", async (req, res) => {
  console.log("Request received on /api/products");
  try {
    console.log("Spreadsheet ID:", PRODUCT_LIST_ID);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Products!A2:E3",
    });

    console.log("API Response:", response.data);

    const rows = response.data.values;
    if (rows && rows.length) {
      console.log("Rows data: ", rows);
      res.status(200).json(rows);
    } else {
      res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    console.error(
      "Error reading data: ",
      error.response?.data || error.message
    );
    res.status(500).send("Server error");
  }
});

app.post("/api/order", async (req, res) => {
  console.log("Request received on /api/order");

  const orderNo = uuidv4();
  const { products, purchaser, termsConfirmed } = req.body;
  console.log(
    "Payload being sent to Google Sheets:",
    purchaser.firstName,
    purchaser.termsConfirmed,
    products[0].title
  );

  const arrOfProducts = [];
  products.forEach((product) => {
    arrOfProducts.push([
      product.id,
      product.title,
      product.quantity,
      product.totalPrice,
    ]);
  });
  console.log("arrOfProducts: ", arrOfProducts);

  const orderValues = (arr1, arr2) => {
    let arr = [];
    for (const element of arr2) {
      arr.push(arr1.concat(element));
    }
    return arr;
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A2",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        majorDimension: "ROWS",
        values: orderValues(
          [
            purchaser.firstName,
            purchaser.lastName,
            purchaser.email,
            purchaser.address,
            orderNo,
            purchaser.termsConfirmed,
          ],
          arrOfProducts
        ),
      },
    });
    res.status(200).json({ status: 200, message: "Užsakymas priimtas" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json("Error updating data");
  }
  //res.json({ message: "Užsakymas priimtas" });
});

app.get("/api/login", (req, res) => {
  res.render("");
});

app.post("/api/login", async (req, res) => {
  console.log("Request Body:", req.body);
  res.json({ message: "Login successful", data: req.body });
});

app.use(express.static(path.join(__dirname, "../limo-shop-app/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../limo-shop-app/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
});
