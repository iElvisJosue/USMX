import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../helpers/Regexs";

export const CamposMovimientos = [
  {
    idCampo: "EstadoMovimiento",
    iconoCampo: "bag-check",
    tituloCampo: "Estado del Movimiento",
    nombreCampo: "EstadoMovimiento",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarMovimiento__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "OrigenMovimiento",
    iconoCampo: "locate",
    tituloCampo: "Origen del Movimiento",
    nombreCampo: "OrigenMovimiento",
    placeholderCampo: "Escriba aquí...",
    tipoCampo: "text",
    claseCampo: "RegistrarMovimiento__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "PorDefectoMovimiento",
    iconoCampo: "radio-button-on",
    tituloCampo: "Movimiento por defecto",
    nombreCampo: "PorDefectoMovimiento",
    placeholderCampo: "Escriba aquí...",
    tipoCampo: "select",
    claseCampo: "RegistrarMovimiento__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
    },
  },
  {
    idCampo: "DetallesMovimiento",
    iconoCampo: "document-text",
    tituloCampo: "Detalles del Movimiento",
    nombreCampo: "DetallesMovimiento",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarMovimiento__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
