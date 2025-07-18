const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");

exports.trackVisit = async (req, res) => {
  const { path } = req.body;
  const ip = req.userIp;
  const timestamp = new Date().toISOString();
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "TrackVisits!A2:Z",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        majorDimension: "ROWS",
        values: [[ip, timestamp, path]],
      },
    });
  } catch (error) {
    logger.error({
      context: "visitTrackController",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      ip: req.ip,
      message: error.message,
      stack: error.stack,
    });
  }
};
