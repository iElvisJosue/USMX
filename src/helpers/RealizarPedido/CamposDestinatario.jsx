export const CamposDestinatario = [
  {
    idCampo: "NombreDestinatario",
    iconoCampo: "person",
    tituloCampo: "Nombre",
    nombreCampo: "NombreDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "ApellidoPaternoDestinatario",
    iconoCampo: "man",
    tituloCampo: "Apellido paterno",
    nombreCampo: "ApellidoPaternoDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "ApellidoMaternoDestinatario",
    iconoCampo: "woman",
    tituloCampo: "Apellido materno",
    nombreCampo: "ApellidoMaternoDestinatario",

    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "TelefonoCasaDestinatario",
    iconoCampo: "call",
    tituloCampo: "Teléfono casa",
    nombreCampo: "TelefonoCasaDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
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
    idCampo: "CelularDestinatario",
    iconoCampo: "phone-portrait",
    tituloCampo: "Celular",
    nombreCampo: "CelularDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "CorreoDestinatario",
    iconoCampo: "mail",
    tituloCampo: "Correo electrónico",
    nombreCampo: "CorreoDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
