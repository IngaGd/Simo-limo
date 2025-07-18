const { body, validationResult } = require("express-validator");

const validateUserMessageInput = [
  body("userMessage.firstName")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Vardas gali būti nuo 2 iki 50 simbolių.")
    .bail()
    .isString()
    .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
    .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
    .trim()
    .escape(),
  body("userMessage.email")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isEmail()
    // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Netinkamas el. pašto formatas (pvz., vardas@domenas.lt.)"),
  body("userMessage.message")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Būtų smagu gauti bent dviejų simbolių žinutę.")
    .isLength({ max: 1000 })
    .withMessage("Žinutė per ilga, gal galėtum sutrumpinti iki 1000 simbolių?")
    .matches(/^[\p{L}\p{N}\s\.,!?'"()\-]+$/u)
    .withMessage(
      "Galimi simboliai: raidės, skaičiai, kableliai, kabutės, skliausteliai ir kiti įprasti simboliai."
    )
    .trim()
    .escape(),

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

module.exports = { validateUserMessageInput };
