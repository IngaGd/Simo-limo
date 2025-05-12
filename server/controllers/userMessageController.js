const axios = require("axios");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const logger = require("../utils/logger");

exports.sendUserMessage = async (req, res) => {
  const { _csrf, userMessage } = req.body;

  if (_csrf !== req.csrfToken) {
    return res.status(403).json({
      status: 403,
      message: "Sesija pasibaigė. Įkelk puslapį iš naujo.",
    });
  }

  try {
    const response = await axios.post(
      process.env.GOOGLE_SCRIPT_MESSAGES_URL,
      JSON.stringify({
        apiKey: process.env.GOOGLE_SCRIPT_USER_MESSAGE_SECRET,
        email: DOMPurify.sanitize(userMessage.email),
        firstName: DOMPurify.sanitize(userMessage.firstName),
        message: DOMPurify.sanitize(userMessage.message),
      }),
      {
        headers: { "Content-type": "application/json" },
      }
    );
    console.log("User message data: ", response.data);
    res.status(200).json({
      type: "success",
      status: 200,
      message: "Žinutė išsiųsta sėkmingai.",
    });
  } catch (error) {
    logger.error({
      context: "userMessageController",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      type: "error",
      status: 500,
      message: "Įvyko klaida siunčiant žinutę.",
    });
  }
};
