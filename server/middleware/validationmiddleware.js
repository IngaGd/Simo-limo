const { body, validationResult } = require("express-validator");

const validateOrder = [
  body("purchaser.firstName")
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
  body("purchaser.lastName")
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
  body("purchaser.phone")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .matches(/^\+?[0-9]{1,4}[0-9]{6,14}$/)
    .withMessage("Telefono numerio pavyzdys (pavyzdys: +370656789)."),
  body("purchaser.email")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isEmail()
    .normalizeEmail()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  body("purchaser.street")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Gatvės pavadinimas gali būti nuo 2 iki 50 simbolių.")
    .bail()
    .isString()
    .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
    .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
    .trim()
    .escape(),
  body("purchaser.town")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Gatvės pavadinimas gali būti nuo 2 iki 50 simbolių.")
    .bail()
    .isString()
    .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
    .withMessage("Pašalinkite negalimus simbolius, galimi - raidės, (-), (')")
    .trim()
    .escape(),
  body("purchaser.postCode")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isString()
    .replace()
    .matches(/^[A-Z]{2}\d{4,10}$/)
    .withMessage("Pašto kodo pavyzdys LT01234"),
  // sanitizeBody("notifyOnReply").toBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateOrder };
