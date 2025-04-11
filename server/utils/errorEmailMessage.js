const axios = require("axios");

const errorEmailMessage = ({
  status,
  reference,
  transaction,
  receivedAt,
  synced,
}) => {
  axios
    .post(
      process.env.GOOGLE_SCRIPT_FAILED_SHEETS_UPDATES,
      JSON.stringify({
        apiKey: process.env.GOOGLE_SCRIPT_FAILED_SHEETS_SECRET,
        status: status,
        reference: reference,
        transaction: transaction,
        receivedAt: receivedAt,
        synced: synced,
      }),
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((response) => {
      console.log("Error message is sent to dev:", response.data);
      return { success: true };
    })
    .catch((error) => {
      logger.error({
        context: "backupFailedUpdate-message",
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        reference,
        transaction,
      });
      return { success: false, error: "Message sending failed" };
    });
};

module.exports = {
  errorEmailMessage,
};
