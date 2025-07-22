const { body, validationResult } = require("express-validator");

const validateSubscriptionInput = [
  body("userEmail.email")
    .notEmpty()
    .withMessage("Privalomas laukas.")
    .bail()
    .isEmail()
    // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage(
      "Netinkamas el. pašto formatas (pvz., vardas@domenas.lt. back)"
    ),
  // sanitizeBody("notifyOnReply").toBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());

      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSubscriptionInput };
