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
