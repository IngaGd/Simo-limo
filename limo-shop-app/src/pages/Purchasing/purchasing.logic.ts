export const validationOptions = () => ({
  firstName: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
      message: "Galimi simboliai - raidės, (-), (')",
    },
    minLength: { value: 2, message: "Vardas turėtų būti ne mažiau 2 raidžių." },
    maxLength: {
      value: 50,
      message: "Vardas turėtų būti ne daugiau 50 raidžių.",
    },
  },
  lastName: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
      message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
    },
    minLength: {
      value: 2,
      message: "Pavardė turėtų būti ne mažiau 2 raidžių.",
    },
    maxLength: {
      value: 50,
      message: "Pavardė turėtų būti ne daugiau 50 raidžių.",
    },
  },
  phone: {
    required: "Privalomas laukas",
    pattern: {
      value: /^\+370\d{8}$/,
      message: "Telefono numerio pavyzdys: +3706xxxxxxx",
    },
  },
  email: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Neteisingai suvestas el. pašto adresas.",
    },
  },
  address: {
    required: "Privalomas laukas",
    pattern: {
      value: /^(?=.*\d)[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9' /.-]+$/,
      message: "Adrese nurodyk gatvės pavadinimą, namo/buto numerį.",
    },
    minLength: { value: 5, message: "Turėtų būti vent 5 simboliai." },
    maxLength: {
      value: 50,
      message: "Gatvė turi būti ne daugiau 50 raidžių.",
    },
  },
  town: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
      message: "Galimi simboliai - raidės, (-), (')",
    },
    minLength: {
      value: 2,
      message: "Miestas turėtų būti bent 2 raidžių ilgio.",
    },
    maxLength: {
      value: 50,
      message: "Miestas turi būti ne daugiau 50 raidžių.",
    },
  },
  postCode: {
    required: "Privalomas laukas",
    pattern: {
      value: /^\d{5}$/,
      message: "Pašto kodo pavyzdys 01234",
    },
  },
  discountCode: {
    pattern: {
      value: /^[A-Z]{4}\d{4}$/,
      message: "Nuolaidos kodas neteisingas",
    },
  },
  message: {
    // required: "Privalomas laukas",
    pattern: {
      value: /^[\p{L}\p{N}\s\.,!?'"()\-]+$/u,
      message:
        "Galimi simboliai: raidės, skaičiai, kableliai, kabutės, skliausteliai ir kiti įprasti simboliai.",
    },
    minLength: {
      value: 2,
      message: "Būtų smagu gauti bent dviejų simbolių žinutę.",
    },
    maxLength: {
      value: 1000,
      message:
        "Žinutė truputį per ilga, gal galėtum sutrumpinti iki 1000 simbolių?",
    },
  },
});
