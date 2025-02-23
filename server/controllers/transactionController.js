const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");

exports.updateTransactionStatus = async (req, res) => {
  const { status, reference, transaction } = req.body;
  console.log("Put route is trugered, reference: ", reference);

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A3:N",
    });
    const rows = response.data.values;
    if (!rows && !rows.length) {
      return res.status(404).send({ message: "No data found" });
    }

    console.log("Rows in put: ", rows);

    const rowIndexes = rows
      .map((col, index) => (col[7] === reference ? index + 3 : -1))
      .filter((index) => index > -1);

    if (rowIndexes.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("rowIndexes: ", rowIndexes);

    for (const rowIndex of rowIndexes) {
      const updateRange = `Orders!N${rowIndex}:O${rowIndex}`;

      await sheets.spreadsheets.values.update({
        spreadsheetId: PRODUCT_LIST_ID,
        range: updateRange,
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          values: [[status, transaction]],
        },
      });
    }

    return res.status(200).json({
      message: `Payment status updated to ${status}, Transaction ID: ${transaction}`,
    });
  } catch (error) {
    console.error(
      "Error reading data: ",
      error.response?.data || error.message
    );
    res.status(500).send("Server error");
  }
};
