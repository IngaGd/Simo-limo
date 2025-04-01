const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const axios = require("axios");

exports.getPaymentStatus = async (req, res) => {
  console.log("Call check-session, cookie: ", req.cookies.session);
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
        // packageTotalQty: Number(order[14]),
        // packageTotalPrice: Number(order[15]),
        // deliveryPrice: Number(order[16]),
      };
    });
    console.log("orderItems: ", orderItems);

    if (!matchedOrders) {
      return res
        .status(403)
        .json({ message: "Invalid session, or order not found" });
    }

    const paymentStatus = matchedOrders[0][22];
    const email = matchedOrders[0][3];
    const orderNo = matchedOrders[0][24];
    const packageTotalQty =
      matchedOrders.length > 1
        ? Number(matchedOrders[0][14]) + Number(matchedOrders[1][14])
        : Number(matchedOrders[0][14]);
    const packageTotalPrice =
      matchedOrders.length > 1
        ? (Number(matchedOrders[0][15]) + Number(matchedOrders[1][15])).toFixed(
            2
          )
        : Number(matchedOrders[0][15]).toFixed(2);
    const deliveryPrice =
      matchedOrders.length > 1
        ? (Number(matchedOrders[0][16]) + Number(matchedOrders[1][16])).toFixed(
            2
          )
        : Number(matchedOrders[0][16]).toFixed(2);
    const amountWithPVM = Number(matchedOrders[0][17]).toFixed(2);
    const amountPVM = Number(matchedOrders[0][18]).toFixed(2);
    const amountWithoutPVM = Number(matchedOrders[0][19]).toFixed(2);

    console.log("Email in payment status: ", email);
    console.log("packageTotalQty: ", packageTotalQty);

    if (paymentStatus === "COMPLETED" && orderNo > 0) {
      axios
        .post(
          process.env.GOOGLE_SCRIPT_URL,
          JSON.stringify({
            orderNo: `${orderNo}`,
            email: `${matchedOrders[0][3]}`,
            firstName: `${matchedOrders[0][0]}`,
            lastName: `${matchedOrders[0][1]}`,
            phone: `${matchedOrders[0][2]}`,
            address: `${matchedOrders[0][4]}`,
            town: `${matchedOrders[0][5]}`,
            postCode: `${matchedOrders[0][6]}`,
            packageTotalQty: packageTotalQty,
            packageTotalPrice: packageTotalPrice,
            deliveryPrice: deliveryPrice,
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
    return res.status(500).json({ message: "Server error" });
  }
};
