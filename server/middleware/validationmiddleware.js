const { body, validationResult } = require("express-validator");

const validateInput = [
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
    .withMessage("Pavardė gali būti nuo 2 iki 50 simbolių.")
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
    .matches(/^\+370\d{8}$/)
    .withMessage("Telefono numerio pavyzdys: +3706xxxxxxx arba +3705xxxxxxx"),
  body("purchaser.email")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isEmail()
    // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Netinkamas el. pašto formatas (pvz., vardas@domenas.lt)"),
  body("purchaser.address")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isLength({ min: 5, max: 50 })
    .withMessage("Adresas turi būti nuo 5 iki 50 simbolių.")
    .bail()
    .isString()
    .matches(/^(?=.*\d)[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9' /.-]+$/)
    .withMessage("Adrese nurodyk gatvės pavadinimą, namo/buto numerį.")
    .trim(),
  body("purchaser.town")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Miesto pavadinimas turi būti nuo 2 iki 50 simbolių.")
    .bail()
    .isString()
    .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/)
    .withMessage("Galimi simboliai - raidės, (-), (').")
    .trim()
    .escape(),
  body("purchaser.postCode")
    .notEmpty()
    .withMessage("Privalomas laukas")
    .bail()
    .isString()
    .matches(/^\d{5}$/)
    .withMessage("Pašto kodo pavyzdys 01234"),
  body("purchaser.termsConfirmed")
    .equals("true")
    .withMessage(
      "Pažymėk sutikimą su pirkimo sąlygomis ir privatumo politika."
    ),
  // sanitizeBody("notifyOnReply").toBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateInput };
