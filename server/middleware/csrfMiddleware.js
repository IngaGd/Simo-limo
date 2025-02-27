const { generateCsrfToken } = require("../utils/csrfTokenGenerator");

const csrcMiddleware = (req, res, next) => {
  console.log("Cookies: ", req.cookies);

  if (!req.cookies.csrfToken) {
    const csrfToken = generateCsrfToken();
    res.cookie("csrfToken", csrfToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    req.csrfToken = csrfToken;
  } else {
    req.csrfToken = req.cookies.csrfToken;
  }
  next();
};

module.exports = { csrcMiddleware };
