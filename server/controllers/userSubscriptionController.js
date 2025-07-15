const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const logger = require("../utils/logger");

exports.setUserSubscription = async (req, res) => {
  const { _csrf, userEmail } = req.body;

  console.log("email: ", userEmail.email, "csrf: ", _csrf);

  if (_csrf !== req.csrfToken) {
    return res.status(403).json({
      status: 403,
      message: "Sesija pasibaigė. Įkelk puslapį iš naujo.",
    });
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Subscribers!A2:Z",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        majorDimension: "ROWS",
        values: [[DOMPurify.sanitize(userEmail.email)]],
      },
    });
    res.status(200).json({
      type: "success",
      status: 200,
      message: "Ačiū! Užregistravau.",
      subscription: true,
    });
  } catch (error) {
    logger.error({
      context: "userSubscriptionController",
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
