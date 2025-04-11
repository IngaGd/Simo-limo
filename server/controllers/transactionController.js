const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const logger = require("../utils/logger");

exports.updateTransactionStatus = async (req, res) => {
  const { status, reference, transaction } = req.body;
  console.log("Put route is trugered, reference: ", reference);

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A3:Z",
    });
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).send({
        type: "error",
        message: "Nepavyko rasti užsakymo, suvesk iš naujo.",
      });
    }

    const rowIndexes = rows
      .map((col, index) => (col[7] === reference ? index + 3 : -1))
      .filter((index) => index > -1);

    if (rowIndexes.length === 0) {
      return res.status(403).json({
        message: "Nepavyko rasti užsakymo, suvesk iš naujo.",
      });
    }

    const completedOrderRefs = new Set(
      rows.filter((row) => row[22] === "COMPLETED").map((row) => row[7])
    );

    let orderNumber = 0;
    if (status === "COMPLETED") {
      orderNumber = completedOrderRefs.size + 1;
    }

    const date = new Date().toISOString().split("T")[0];

    for (const rowIndex of rowIndexes) {
      const updateRange = `Orders!W${rowIndex}:Z${rowIndex}`;

      await sheets.spreadsheets.values.update({
        spreadsheetId: PRODUCT_LIST_ID,
        range: updateRange,
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          values: [
            [
              status,
              transaction,
              status === "COMPLETED" ? orderNumber.toString() : "",
              status === "COMPLETED" ? date : "",
            ],
          ],
        },
      });
    }

    return res.status(200).json({
      message: `Payment status updated to ${status}, Transaction ID: ${transaction}`,
    });
  } catch (error) {
    console.error("Error reading data: ", error);
    logger.error({
      context: "orderController",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      message: error?.response?.data?.error?.message || error.message,
      stack: error.stack,
      transactionRef: req.reference,
    });
    res.status(error.status || 500).json({
      type: "error",
      status: error.status,
      message: "Serverio klaida, perkrauk puslapį arba bandyk vėliau.",
    });
  }
};
