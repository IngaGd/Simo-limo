const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const logger = require("../utils/logger");
const axios = require("axios");

exports.getPaymentStatus = async (req, res) => {
  const sessionId = req.cookies.session;
  if (!sessionId) {
    return res.status(400).json({ message: "Session not found" });
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A3:Z",
    });
    const rows = response.data.values;
    if (!rows && !rows.length) {
      return res.status(404).send({ message: "No data found" });
    }

    const matchedOrders = rows.filter((col) => col[21] === sessionId);
    const orderItems = matchedOrders.map((order) => {
      return {
        title: order[10],
        quantity: order[11],
        price: Number(order[12]).toFixed(2),
        totalPrice: Number(order[13]).toFixed(2),
      };
    });

    if (!matchedOrders) {
      return res
        .status(403)
        .json({ message: "Invalid session, or order not found" });
    }

    const paymentStatus = matchedOrders[0][22];
    const email = matchedOrders[0][3];
    const orderNo = matchedOrders[0][24];

    let packageTotalQty = 0;
    matchedOrders.forEach((row) => {
      packageTotalQty += Number(row[14]);
    });

    let packageTotalPrice = 0;
    matchedOrders.forEach((row) => {
      packageTotalPrice += Number(row[15]);
    });
    const packageTotalPriceFloat = packageTotalPrice.toFixed(2);

    let deliveryPrice = 0;
    matchedOrders.forEach((row) => {
      deliveryPrice += Number(row[16]);
    });
    const deliveryPriceFloat = deliveryPrice.toFixed(2);

    const amountWithPVM = Number(matchedOrders[0][17]).toFixed(2);
    const amountPVM = Number(matchedOrders[0][18]).toFixed(2);
    const amountWithoutPVM = Number(matchedOrders[0][19]).toFixed(2);

    if (paymentStatus === "COMPLETED" && orderNo > 0) {
      axios
        .post(
          process.env.GOOGLE_SCRIPT_URL,
          JSON.stringify({
            apiKey: process.env.GOOGLE_SCRIPT_SECRET,
            orderNo: `${orderNo}`,
            email: email,
            firstName: `${matchedOrders[0][0]}`,
            lastName: `${matchedOrders[0][1]}`,
            phone: `${matchedOrders[0][2]}`,
            address: `${matchedOrders[0][4]}`,
            town: `${matchedOrders[0][5]}`,
            postCode: `${matchedOrders[0][6]}`,
            packageTotalQty: packageTotalQty,
            packageTotalPrice: packageTotalPriceFloat,
            deliveryPrice: deliveryPriceFloat,
            amountWithPVM: amountWithPVM,
            amountPVM: amountPVM,
            amountWithoutPVM: amountWithoutPVM,
            date: `${matchedOrders[0][25]}`,
            items: orderItems,
          }),
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => console.log("Invoice is created:", response.data))
        .catch((error) => {
          console.error(
            "Failed to trigger invoice generation:",
            error.response?.data || error.message
          );
          logger.error({
            context: "statusesController",
            timestamp: new Date().toISOString(),
            message: error.response?.data?.message || error.message,
            errors: error.response?.data?.errors,
            sessionId: error.response?.data?.sessionId,
          });
        });

      res.status(200).json({
        paymentStatus: paymentStatus,
        clientOrderNo: orderNo,
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
    logger.error({
      context: "orderController",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      message: error.message,
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
