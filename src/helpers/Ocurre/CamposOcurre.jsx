export const CamposOcurre = [
  {
    idCampo: "NombreOcurre",
    iconoCampo: "alert-circle",
    tituloCampo: "Nombre del ocurre",
    nombreCampo: "NombreOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo",
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
    idCampo: "OperadorLogisticoOcurre",
    iconoCampo: "business",
    tituloCampo: "Operador logístico",
    nombreCampo: "OperadorLogisticoOcurre",
    tipoCampo: "select",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
    },
  },
  {
    idCampo: "TelefonoOcurre",
    iconoCampo: "call",
    tituloCampo: "Teléfono",
    nombreCampo: "TelefonoOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo",
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
    idCampo: "CorreoOcurre",
    iconoCampo: "mail",
    tituloCampo: "Correo electrónico",
    nombreCampo: "CorreoOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo",
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
    idCampo: "ColoniaOcurre",
    iconoCampo: "golf",
    tituloCampo: "Colonia",
    nombreCampo: "ColoniaOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "MunicipioDelegacionOcurre",
    iconoCampo: "navigate",
    tituloCampo: "Municipio o delegación",
    nombreCampo: "MunicipioDelegacionOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo",
    validadorCampo: {
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CodigoPostalOcurre",
    iconoCampo: "pin",
    tituloCampo: "Código Postal",
    nombreCampo: "CodigoPostalOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo",
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
    idCampo: "CiudadOcurre",
    iconoCampo: "locate",
    tituloCampo: "Ciudad",
    nombreCampo: "CiudadOcurre",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select",
    tipoCampo: "text",
    claseCampo: "InformacionOcurre__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "EstadoOcurre",
    iconoCampo: "location",
    tituloCampo: "Estado",
    nombreCampo: "EstadoOcurre",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select",
    tipoCampo: "text",
    claseCampo: "InformacionOcurre__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "DireccionOcurre",
    iconoCampo: "trail-sign",
    tituloCampo: "Dirección",
    nombreCampo: "DireccionOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ReferenciaOcurre",
    iconoCampo: "document-text",
    tituloCampo: "Referencia",
    nombreCampo: "ReferenciaOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo Tres",
    validadorCampo: {
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ObservacionesOcurre",
    iconoCampo: "search",
    tituloCampo: "Observaciones",
    nombreCampo: "ObservacionesOcurre",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionOcurre__Campo Tres",
    validadorCampo: {
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
];
