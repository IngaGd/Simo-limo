const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const pathToJson = path.join(__dirname, "../limo.json");
const credentials = JSON.parse(fs.readFileSync(pathToJson));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const PRODUCT_LIST_ID = process.env.PRODUCT_LIST_SPREADSHEET_ID;

module.exports = {
  sheets,
  PRODUCT_LIST_ID,
};
