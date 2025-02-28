export const validationOptions = () => ({
  firstName: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
      message: "Pašalinkite negalimus sximbolius, galimi - raidės, (-), (')",
    },
    minLength: { value: 2, message: "Vardas turi būti ne mažiau 2 raidžių." },
    maxLength: {
      value: 50,
      message: "Vardas turi būti ne daugiau 50 raidžių.",
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
      message: "Pavardė turi būti ne mažiau 2 raidžių.",
    },
    maxLength: {
      value: 50,
      message: "Pavardė turi būti ne daugiau 50 raidžių.",
    },
  },
  phone: {
    required: "Privalomas laukas",
    pattern: {
      value: /^\+?[0-9]{1,4}[0-9]{6,14}$/,
      message: "Telefono numerio pavyzdys (pavyzdys: +370656789).",
    },
  },
  email: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Neteisingai suvestas el. pašto adresas.",
    },
  },
  street: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
      message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
    },
    minLength: { value: 2, message: "Vardas turi būti ne mažiau 2 raidžių." },
    maxLength: {
      value: 50,
      message: "Gatvė turi būti ne daugiau 50 raidžių.",
    },
  },
  town: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
      message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
    },
    minLength: {
      value: 2,
      message: "Miestas turi būti ne mažiau 2 raidžių.",
    },
    maxLength: {
      value: 50,
      message: "Miestas turi būti ne daugiau 50 raidžių.",
    },
  },
  postCode: {
    required: "Privalomas laukas",
    pattern: {
      value: /^[A-Z]{2}\d{4,10}$/,
      message: "Pašto kodo pavyzdys LT01234",
    },
  },
});
