const axios = require("axios");

exports.sendUserMessage = (req, res) => {
  console.log("Request received on UserMessage");

  const { _csrf, userMessage } = req.body;

  if (_csrf !== req.csrfToken) {
    return res.status(403).send("Sesija pasibaigė. Įkelk puslapį iš naujo.");
  }

  console.log(userMessage);

  axios
    .post(
      process.env.GOOGLE_SCRIPT_MESSAGES_URL,
      JSON.stringify({
        email: userMessage.email,
        firstName: userMessage.firstName,
        message: userMessage.message,
      }),
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((response) => console.log("User message sent:", response.data))
    .catch((error) => {
      console.error(
        "Failed to send user message",
        error.response?.data || error.message
      );
    });
};
