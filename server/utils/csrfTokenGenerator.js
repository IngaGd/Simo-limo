const crypto = require("crypto");

const generateCsrfToken = () => {
  return crypto.randomBytes(60).toString("base64");
};

module.exports = {
  generateCsrfToken,
};
