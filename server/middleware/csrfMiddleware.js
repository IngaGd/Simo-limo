const { generateCsrfToken } = require("../utils/csrfTokenGenerator");
const logger = require("../utils/logger");

const csrcMiddleware = (req, res, next) => {
  try {
    if (!req.cookies.csrfToken) {
      const csrfToken = generateCsrfToken();
      res.cookie("csrfToken", csrfToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 30 * 60 * 1000,
      });
      req.csrfToken = csrfToken;
    } else {
      req.csrfToken = req.cookies.csrfToken;
    }
    next();
  } catch (error) {
    logger.error({
      context: "csrcMiddleware",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      message: error.message,
      stack: error.stack,
    });
    res.status(error.status || 500).json({
      type: "error",
      message: "Nepavyko įkelti saugumo duomenų. Pabandyk perkrauti puslapį.",
    });
  }
};
module.exports = { csrcMiddleware };
