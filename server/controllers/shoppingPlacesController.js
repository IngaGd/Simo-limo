const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");

exports.getShoppingPlaces = async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Places!A2:I",
    });
    const data = response.data.values;
    if (!data) {
      res.status(404).send({ type: "error", message: "Sąrašas tuščias" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
  }
};
