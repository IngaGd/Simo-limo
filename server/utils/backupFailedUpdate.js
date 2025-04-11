const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const logger = require("../utils/logger");
const { errorEmailMessage } = require("../utils/errorEmailMessage");

const backupFailedUpdate = async ({ status, reference, transaction }) => {
  console.log("Backup attempt:", { status, reference, transaction });
  const receivedAt = new Date().toISOString();
  const synced = false;

  errorEmailMessage({ status, reference, transaction, receivedAt, synced });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "FailedSheetsUpdates!A2:Z",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "USER_ENTERED",
      resource: {
        majorDimension: "ROWS",
        values: [[status, reference, transaction, receivedAt, synced]],
      },
    });
  } catch (error) {
    logger.error({
      context: "backupFailedUpdate-sheets",
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      reference,
      transaction,
    });
    return { success: false, error: "Sheet backup failed" };
  }
};

module.exports = {
  backupFailedUpdate,
};
