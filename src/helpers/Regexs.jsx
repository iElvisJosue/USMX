export const REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS = {
  value: /^[a-zA-Z0-9].*[a-zA-Z0-9]$/,
  message: "¡La cadena debe empezar y terminar con una letra o número! 🔠",
};
export const REGEX_SOLO_NUMEROS = {
  value: /^\d+$/,
  message: "¡Este campo solo acepta números! 🔠",
};
export const REGEX_CORREO = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "¡Formato de correo no valido! ⚠️",
};
export const REGEX_DECIMALES = {
  value: /^\d+(?:\.\d{1,2})?$/,
  message: "¡Este campo solo acepta números con dos decimales! 🔠",
};
// export const REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS = {
//   es: {
//     value: /^[a-zA-Z0-9].*[a-zA-Z0-9]$/,
//     message: "¡La cadena debe empezar y terminar con una letra o número! 🔠",
//   },
//   en: {
//     value: /^[a-zA-Z0-9].*[a-zA-Z0-9]$/,
//     message: "¡The string must start and end with a letter or number! 🔠",
//   },
// };

// export const REGEX_SOLO_NUMEROS = {
//   es: {
//     value: /^\d+$/,
//     message: "¡Este campo solo acepta números! 🔠",
//   },
//   en: {
//     value: /^\d+$/,
//     message: "¡This field only accepts numbers! 🔠",
//   },
// };

// export const REGEX_CORREO = {
//   es: {
//     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//     message: "¡Formato de correo no valido! ⚠️",
//   },
//   en: {
//     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//     message: "¡Invalid email format! ⚠️",
//   },
// };

// export const REGEX_DECIMALES = {
//   es: {
//     value: /^\d+(?:\.\d{1,2})?$/,
//     message: "¡Este campo solo acepta números con dos decimales! 🔠",
//   },
//   en: {
//     value: /^\d+(?:\.\d{1,2})?$/,
//     message: "¡This field only accepts numbers with two decimals! 🔠",
//   },
// };
