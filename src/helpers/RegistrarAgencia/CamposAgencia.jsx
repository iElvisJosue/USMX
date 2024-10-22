import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../helpers/Regexs";

export const CamposAgencia = [
  {
    idCampo: "NombreAgencia",
    iconoCampo: "business",
    tituloCampo: "Nombre de la agencia",
    nombreCampo: "NombreAgencia",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo Dos",
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
    idCampo: "NombreContacto",
    iconoCampo: "person",
    tituloCampo: "Nombre del contacto",
    nombreCampo: "NombreContacto",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo Dos",
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
    idCampo: "TelefonoContacto",
    iconoCampo: "call",
    tituloCampo: "Teléfono del contacto",
    nombreCampo: "TelefonoContacto",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_SOLO_NUMEROS,
      maxLength: {
        value: 10,
        message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
      },
      minLength: {
        value: 10,
        message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CorreoContacto",
    iconoCampo: "mail",
    tituloCampo: "Correo del contacto",
    nombreCampo: "CorreoContacto",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_CORREO,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
