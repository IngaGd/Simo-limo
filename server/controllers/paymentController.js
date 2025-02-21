require("dotenv").config();
const axios = require("axios");

exports.createTransaction = async (req, res) => {
  console.log("Request received on /api/create-transaction");
  console.log("User IP: ", req.userIp);

  const { tarnsactionData } = req.body;

  const requestTransactionData = {
    transaction: {
      amount: tarnsactionData.amount.toString(),
      currency: tarnsactionData.currency,
      reference: tarnsactionData.reference,
      //merchant_data: `Internal Order ID: ${tarnsactionData.reference}`,
      transaction_url: {
        return_url: {
          url: process.env.RETURN_URL,
          method: "GET",
        },
        cancel_url: {
          url: process.env.CANCEL_URL,
          method: "GET",
        },
        notification_url: {
          url: process.env.NOTIFICATION_URL,
          method: "POST",
        },
      },
    },
    customer: {
      ip: req.userIp,
      country: "LT",
      locale: "LT",
    },
  };

  const authHeader = `Basic ${Buffer.from(
    `${process.env.MAKECOMMERCE_STORE_ID}:${process.env.MAKECOMMERCE_SECRET_KEY}`
  ).toString("base64")}`;

  try {
    const response = await axios.post(
      process.env.MAKECOMMERCE_API_URL,
      requestTransactionData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/hal+json",
          Authorization: authHeader,
        },
      }
    );
    console.log("MakeCommerce response: ", response.data);
    const redirectPaymentUrl = response.data.payment_methods?.other?.find(
      (method) => method.name === "redirect"
    )?.url;
    res.status(201).json({
      message: "Transaction created successfully",
      redirectUrl: redirectPaymentUrl,
    });
  } catch (error) {
    console.error("Error: ", error.response?.data || error.message);
  }
};
