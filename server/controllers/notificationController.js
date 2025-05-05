const crypto = require("crypto");
const logger = require("../utils/logger");
const { backupFailedUpdate } = require("../utils/backupFailedUpdate");

exports.postNotification = async (req, res) => {
  console.log("raw payment-notification body: ", req.body.json);
  const jsonString = req.body.json;
  const receivedMac = req.body.mac;
  const calculatedMac = crypto
    .createHash("sha512")
    .update(jsonString + process.env.MAKECOMMERCE_SECRET_KEY)
    .digest("hex")
    .toUpperCase();
  if (receivedMac !== calculatedMac) {
    return res.status(400).send("Invalid Mac");
  }

  console.log("MAC validation passed");

  try {
    const paymentData = JSON.parse(jsonString);
    const { status, reference, transaction } = paymentData;
    console.log(
      `Payment Notification - Status: ${status}, Reference: ${reference}, Transaction ID: ${transaction}`
    );

    try {
      const updatePaymentData = await fetch(
        process.env.PAYMENT_STATUS_UPDATE_URL,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, reference, transaction }),
        }
      );
      if (!updatePaymentData.ok) {
        const errorData = await updatePaymentData.json();
        logger.error({
          context: "postNotification-sheet-route-response",
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
          status: errorData.status || error.status,
          message: errorData.message || error.message,
          stack: error.stack,
          transactionRef: req.reference,
        });
        return res.status(500).send("Failed update Sheets");
      }
      const updateResult = await updatePaymentData.json();
      console.log("Update Response: ", updateResult);
      return res
        .status(200)
        .send({ message: "Notification received. DB updated." });
    } catch (error) {
      logger.error({
        context: "postNotification-sheets-update",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        message: error.message,
        stack: error.stack,
        transactionRef: reference,
      });
      const backupResult = await backupFailedUpdate({
        reference,
        status,
        transaction,
      });
      if (!backupResult.success) {
        logger.error({
          context: "postNotification-sheet-route-response",
          message: backupResult.error,
          timestamp: new Date().toISOString(),
        });
      }
      return res.status(500).send("Sheets processing error.");
    }
  } catch (error) {
    logger.error({
      context: "postNotification-makecommerce",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      message: error.message,
      stack: error.stack,
      transactionRef: req.reference,
    });
    console.error("Error in notification post", error);
    res.status(400).send("Invalid notification data");
  }
};
