require("dotenv").config();
const axios = require("axios");
const logger = require("../utils/logger");

exports.createTransaction = async (req, res) => {
  const { transactionData } = req.body;
  const requestTransactionData = {
    transaction: {
      amount: transactionData.amount.toString(),
      currency: transactionData.currency,
      reference: transactionData.reference,
      //merchant_data: `Internal Order ID: ${transactionData.reference}`,
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
    console.log("redirectPaymentUrl: ", redirectPaymentUrl);
    res.status(201).json({
      message: "Transaction created successfully",
      redirectUrl: redirectPaymentUrl,
    });
  } catch (error) {
    if (!error.response) {
      logger.error({
        context: "createTransaction",
        timestamp: new Date().toISOString(),
        message: error.message,
      });
      return res.status(500).json({
        status: 500,
        message:
          "Nepavyko prisijungti prie mokėjimo paslaugos. Bandykite vėliau.",
        type: "error",
      });
    }
    const code = error.response?.data?.code;
    logger.error({
      context: "createTransaction",
      timestamp: new Date().toISOString(),
      code: error.response?.data?.code,
      message: error.response?.data?.message,
      errors: error.response?.data?.errors,
      input: transactionData.reference,
    });
    if (code === 1001) {
      res.status(400).json({
        status: 400,
        message:
          "Neteisingas užklausos formatas. Patikrink siunčiamus duomenis.",
        type: "error",
      });
    } else if (code === 1036) {
      res.status(400).json({
        status: 400,
        message:
          "Nepavyko autentifikuotis. Patikrinkite prisijungimo duomenis.",
        type: "error",
      });
    } else if (code === 1032) {
      res.status(400).json({
        status: 400,
        message: "Nepavyko atlikti mokėjimo, patikrink duomens",
        type: "error",
      });
    } else if (code === 1004) {
      res.status(400).json({
        status: 400,
        message:
          "Nepavyko prisijungti prie paslaugos. Bandykite dar kartą vėliau.",
        type: "error",
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Nenumatyta klaida, bandyk vėliau.",
        type: "error",
      });
    }
  }
};
