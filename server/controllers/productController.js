const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");

exports.getProducts = async (req, res) => {
  console.log("Request received on /api/products");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Products!A2:J",
    });
    const rows = response.data.values;
    if (rows && rows.length) {
      console.log("Rows data: ", rows);
      res.status(200).json(rows);
    } else {
      res.status(404).send({ message: "Prekių sąrašas tuščias" });
    }
  } catch (error) {
    const status = error.code === 403 ? 403 : 500;
    const message =
      error.code === 403
        ? "Prieiga prie prekių sąrašo negalima"
        : "Serverio klaida. Bandykite vėliau";
    res
      .status(status)
      .json({ status: status, message: message, location: "products" });
  }
};
