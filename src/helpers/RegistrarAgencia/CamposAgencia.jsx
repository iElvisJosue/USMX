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
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
      minLength: {
        value: 4,
        message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
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
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
      minLength: {
        value: 4,
        message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
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
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
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
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "¡Formato de correo no valido! ⚠️",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
