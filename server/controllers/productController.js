const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const logger = require("../utils/logger");

exports.getProducts = async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Products!A2:K",
    });
    const rows = response.data.values;
    if (rows && rows.length) {
      console.log("Rows data: ", rows);
      res.status(200).json(rows);
    } else {
      res
        .status(404)
        .send({ type: "error", message: "Prekių sąrašas tuščias" });
    }
  } catch (error) {
    logger.error({
      context: "productController",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      message: error.message,
      stack: error.stack,
    });
    const status = error.code === 403 ? 403 : 500;
    const message =
      error.code === 403
        ? "Prieiga prie prekių sąrašo negalima"
        : "Serverio klaida. Perkrauk puslapį arba bandyk vėliau";
    res
      .status(status)
      .json({ status: status, message: message, type: "error" });
  }
};
