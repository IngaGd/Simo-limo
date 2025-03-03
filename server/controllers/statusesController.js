const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");

exports.getPaymentStatus = async (req, res) => {
  console.log("Call check-session, cookie: ", req.cookies.session);
  const sessionId = req.cookies.session;
  if (!sessionId) {
    return res.status(400).json({ message: "Session not found" });
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A3:P",
    });
    const rows = response.data.values;
    if (!rows && !rows.length) {
      return res.status(404).send({ message: "No data found" });
    }

    const matchedOrder = rows.find((col) => col[13] === sessionId);

    if (!matchedOrder) {
      return res
        .status(403)
        .json({ message: "Invalid session, or order not found" });
    }

    const paymentStatus = matchedOrder[14];

    if (paymentStatus === "COMPLETED") {
      return res.status(200).json({
        paymentStatus: paymentStatus,
        message: "Payment status is completed",
      });
    } else {
      res.status(200).json({
        paymentStatus: paymentStatus,
        message: "Payment status is not completed",
      });
    }
  } catch (error) {
    console.error("Error reading data: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
