require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const { body, validationResult } = require("express-validator");
const { log } = require("util");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

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
        //"img-src": ["'none'"],
        "connect-src": ["'self'", "https://sheets.googleapis.com"],
      },
    },
  })
);

const pathToJson = path.join(__dirname, "limo.json");
const credentials = JSON.parse(fs.readFileSync(pathToJson));

//const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

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

app.post(
  "/api/order",
  [
    body("purchaser.firstName")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage("Vardas gali būti nuo 2 iki 50 simbolių.")
      .bail()
      .isString()
      .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
      .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
      .trim()
      .escape(),
    body("purchaser.lastName")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage("Vardas gali būti nuo 2 iki 50 simbolių.")
      .bail()
      .isString()
      .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
      .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
      .trim()
      .escape(),
    body("purchaser.phone")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .matches(/^\+?[0-9]{1,4}[0-9]{6,14}$/)
      .withMessage("Telefono numerio pavyzdys (pavyzdys: +370656789)."),
    body("purchaser.email")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .isEmail()
      .normalizeEmail()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    body("purchaser.street")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage("Gatvės pavadinimas gali būti nuo 2 iki 50 simbolių.")
      .bail()
      .isString()
      .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
      .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
      .trim()
      .escape(),
    body("purchaser.town")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage("Gatvės pavadinimas gali būti nuo 2 iki 50 simbolių.")
      .bail()
      .isString()
      .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
      .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
      .trim()
      .escape(),
    body("purchaser.postCode")
      .notEmpty()
      .withMessage("Privalomas laukas")
      .bail()
      .isString()
      .replace()
      .matches(/^[A-Z]{2}\d{4,10}$/)
      .withMessage("Pašto kodo pavyzdys LT01234"),
    // sanitizeBody("notifyOnReply").toBoolean(),
  ],
  async (req, res) => {
    console.log("Request received on /api/order");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orderNo = uuidv4();

    const { products, purchaser, paymentStatus } = req.body;
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

    const orderValues = (arr1, arr2, status) => {
      let arr = [];
      for (const element of arr2) {
        arr.push(arr1.concat(element).concat(status));
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
              DOMPurify.sanitize(purchaser.firstName),
              DOMPurify.sanitize(purchaser.lastName),
              DOMPurify.sanitize(purchaser.phone),
              DOMPurify.sanitize(purchaser.email),
              DOMPurify.sanitize(purchaser.street),
              DOMPurify.sanitize(purchaser.town),
              DOMPurify.sanitize(purchaser.postCode),
              orderNo,
              purchaser.termsConfirmed,
            ],
            arrOfProducts,
            paymentStatus
          ),
        },
      });
      res.status(200).json({
        status: 200,
        message: "Užsakymas apdorojamas",
        orderId: `${orderNo}`,
        paymentStatus: "pending",
        redirectToPayment: true,
      });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json("Error updating data");
    }
  }
);

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
