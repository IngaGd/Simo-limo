const axios = require("axios");

exports.sendUserMessage = async (req, res) => {
  console.log("Request received on UserMessage");

  const { _csrf, userMessage } = req.body;

  if (_csrf !== req.csrfToken) {
    return res.status(403).json({
      status: 403,
      message: "Sesija pasibaigė. Įkelk puslapį iš naujo.",
    });
  }

  console.log(userMessage);

  try {
    const response = await axios.post(
      process.env.GOOGLE_SCRIPT_MESSAGES_URL,
      JSON.stringify({
        email: userMessage.email,
        firstName: userMessage.firstName,
        message: userMessage.message,
      }),
      {
        headers: { "Content-type": "application/json" },
      }
    );
    console.log("User message data: ", response.data);
    res
      .status(200)
      .json({ status: 200, message: "Žinutė išsiųsta sėkmingai." });
  } catch (error) {
    console.error(
      "Failed to send user message",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ status: 500, message: "Įvyko klaida siunčiant žinutę." });
  }
};
