export const CamposRemitente = [
  {
    idCampo: "Nombre",
    iconoCampo: "person",
    tituloCampo: "Nombre",
    nombreCampo: "Nombre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo",
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
    idCampo: "Apellidos",
    iconoCampo: "person",
    tituloCampo: "Apellidos",
    nombreCampo: "Apellidos",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo",
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
    idCampo: "Telefono",
    iconoCampo: "call",
    tituloCampo: "Teléfono casa",
    nombreCampo: "Telefono",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo",
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
    idCampo: "Celular",
    iconoCampo: "phone-portrait",
    tituloCampo: "Celular",
    nombreCampo: "Celular",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo",
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
    idCampo: "Correo",
    iconoCampo: "mail",
    tituloCampo: "Correo electrónico",
    nombreCampo: "Correo",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo Dos",
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
  {
    idCampo: "CodigoPostal",
    iconoCampo: "pin",
    tituloCampo: "Código Postal",
    nombreCampo: "CodigoPostal",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo",
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
    },
  },
  {
    idCampo: "Ciudad",
    iconoCampo: "locate",
    tituloCampo: "Ciudad",
    nombreCampo: "Ciudad",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select
    tipoCampo: "text",
    claseCampo: "InformacionDelRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "Estado",
    iconoCampo: "location",
    tituloCampo: "Estado",
    nombreCampo: "Estado",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select",
    claseCampo: "InformacionDelRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "Direccion",
    iconoCampo: "trail-sign",
    tituloCampo: "Dirección",
    nombreCampo: "Direccion",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "Referencia",
    iconoCampo: "document-text",
    tituloCampo: "Referencia",
    nombreCampo: "Referencia",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelRemitente__Campo",
    validadorCampo: {
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
];
