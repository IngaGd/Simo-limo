const express = require("express");
const app = express();
app.use(express.json());

exports.postNotification = async (req, res) => {
  console.log("raw payment-notification body: ", req.body);
  try {
    const paymentData = JSON.parse(req.body.json);
    const { status, reference, transaction } = paymentData;
    console.log(
      `Payment Notification - Status: ${status}, Reference: ${reference}, Transaction ID: ${transaction}`
    );

    const updatePaymentData = await fetch(
      process.env.PAYMENT_STATUS_UPDATE_URL,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reference, transaction }),
      }
    );
    const updateResult = await updatePaymentData.json();
    console.log("Update Response: ", updateResult);

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error in notification post", error);
    res.status(400).send("Invalid notification data");
  }
};
