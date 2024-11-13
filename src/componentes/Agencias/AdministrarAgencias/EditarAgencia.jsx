/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_ERROR, ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/AdministrarAgencias/EditarAgencia.css";

export default function EditarAgencia({
  informacionDeLaAgencia,
  establecerVista,
}) {
  const { ActualizarInformacionAgencia } = useAgencias();
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] = useState({
    PAIS: informacionDeLaAgencia.PaisAgencia,
    CODIGO_PAIS: informacionDeLaAgencia.CodigoPaisAgencia,
    ESTADO: informacionDeLaAgencia.EstadoAgencia,
    CODIGO_ESTADO: informacionDeLaAgencia.CodigoEstadoAgencia,
    CIUDAD: informacionDeLaAgencia.CiudadAgencia,
    CODIGO_POSTAL: informacionDeLaAgencia.CodigoPostalAgencia,
    DIRECCION: informacionDeLaAgencia.DireccionAgencia,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("NombreAgencia", informacionDeLaAgencia.NombreAgencia);
    setValue("NombreLegalAgencia", informacionDeLaAgencia.NombreLegalAgencia);
    setValue("NombreContacto", informacionDeLaAgencia.NombreContactoAgencia);
    setValue("TelefonoAgencia", informacionDeLaAgencia.TelefonoAgencia);
    setValue("FaxAgencia", informacionDeLaAgencia.FaxAgencia);
    setValue("CorreoAgencia", informacionDeLaAgencia.CorreoAgencia);
    setValue(
      "CorreoAgenciaSecundario",
      informacionDeLaAgencia.CorreoAgenciaSecundario
    );
    setValue("RepresentanteVentas", informacionDeLaAgencia.RepresentanteVentas);
    setValue(
      "TelefonoRepresentanteVentas",
      informacionDeLaAgencia.TelefonoRepresentanteVentas
    );
    setValue("NombreDueno", informacionDeLaAgencia.NombreDueno);
    setValue("TelefonoDueno", informacionDeLaAgencia.TelefonoDueno);
    setValue("NombreManager", informacionDeLaAgencia.NombreManager);
    setValue("TelefonoManager", informacionDeLaAgencia.TelefonoManager);
    setValue(
      "NumeroLicenciaAgencia",
      informacionDeLaAgencia.NumeroLicenciaAgencia
    );
    setValue(
      "NumeroImpuestosVenta",
      informacionDeLaAgencia.NumeroImpuestosVenta
    );
    setValue("SS", informacionDeLaAgencia.SS);
    setValue("CopiaID", informacionDeLaAgencia.CopiaID);
    setValue(
      "CopiaLicenciaNegocio",
      informacionDeLaAgencia.CopiaLicenciaNegocio
    );
    setValue("CopiaImpuestosVenta", informacionDeLaAgencia.CopiaImpuestosVenta);
    if (informacionDeLaAgencia?.NombreAgencia === "USMX Express") {
      document
        .getElementById("NombreAgencia")
        .classList.add("DesactivarNombreAgencia");
    }
  }, []);

  const ActualizarInformacionDeLaAgencia = handleSubmit(async (info) => {
    if (
      informacionDeLaAgencia.NombreAgencia === "USMX Express" &&
      info.NombreAgencia !== "USMX Express"
    ) {
      return toast.error(
        "¡El nombre de la agencia USMX Express no puede ser cambiado!",
        {
          style: ESTILOS_ERROR,
        }
      );
    }
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para actualizar la agencia, debe seleccionar una dirección!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    try {
      info.idAgencia = informacionDeLaAgencia?.idAgencia;
      info.PaisAgencia = detallesDeLaDireccion.PAIS;
      info.CodigoPaisAgencia = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoAgencia = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoAgencia = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadAgencia = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalAgencia = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionAgencia = detallesDeLaDireccion.DIRECCION;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["us", "mx"],
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarAgencia__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  // LOS ESTILOS DE LOS CAMPOS ESTÁN EN COMPONENTES > REGISTRAR AGENCIA > INFORMACIÓN DE LA AGENCIA
  return (
    <form className="EditarAgencia" onSubmit={ActualizarInformacionDeLaAgencia}>
      <div className="EditarAgencia__Opciones">
        <button
          className="EditarAgencia__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarAgencia__Titulo">Editar Agencia</h1>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="business"></ion-icon> Nombre de la agencia
        </p>
        <input
          id="NombreAgencia"
          name="NombreAgencia"
          placeholder="Escriba aquí..."
          tabIndex={-1}
          {...register("NombreAgencia", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("NombreAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="briefcase"></ion-icon> Nombre legal de la agencia
          (DBA)
        </p>
        <input
          id="NombreLegalAgencia"
          name="NombreLegalAgencia"
          placeholder="Escriba aquí..."
          {...register("NombreLegalAgencia", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("NombreLegalAgencia")}
      </span>
      <GoogleAPI {...PropsGoogleAPI} />
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Tel. Agencia
        </p>
        <input
          id="TelefonoAgencia"
          name="TelefonoAgencia"
          placeholder="Escriba aquí..."
          {...register("TelefonoAgencia", {
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
          })}
        ></input>
        {MensajeError("TelefonoAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="print"></ion-icon> Fax
        </p>
        <input
          id="FaxAgencia"
          name="FaxAgencia"
          placeholder="Escriba aquí..."
          {...register("FaxAgencia", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("FaxAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="mail"></ion-icon> Correo Agencia
        </p>
        <input
          id="CorreoAgencia"
          name="CorreoAgencia"
          placeholder="Escriba aquí..."
          {...register("CorreoAgencia", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("CorreoAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="mail"></ion-icon> Correo Agencia #2 (Opcional)
        </p>
        <input
          id="CorreoAgenciaSecundario"
          name="CorreoAgenciaSecundario"
          placeholder="Escriba aquí..."
          {...register("CorreoAgenciaSecundario", {
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("CorreoAgenciaSecundario")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon> Nombre representante ventas
        </p>
        <input
          id="RepresentanteVentas"
          name="RepresentanteVentas"
          placeholder="Escriba aquí..."
          {...register("RepresentanteVentas", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            required: "¡Este campo es obligatorio! ⚠️",
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("RepresentanteVentas")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="call"></ion-icon> Tel. Representante
        </p>
        <input
          id="TelefonoRepresentanteVentas"
          name="TelefonoRepresentanteVentas"
          placeholder="Escriba aquí..."
          {...register("TelefonoRepresentanteVentas", {
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
          })}
        ></input>
        {MensajeError("TelefonoRepresentanteVentas")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon> Nombre del dueño
        </p>
        <input
          id="NombreDueno"
          name="NombreDueno"
          placeholder="Escriba aquí..."
          {...register("NombreDueno", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("NombreDueno")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="call"></ion-icon> Tel. Dueño
        </p>
        <input
          id="TelefonoDueno"
          name="TelefonoDueno"
          placeholder="Escriba aquí..."
          {...register("TelefonoDueno", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("TelefonoDueno")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon> Nombre del manager
        </p>
        <input
          id="NombreManager"
          name="NombreManager"
          placeholder="Escriba aquí..."
          {...register("NombreManager", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("NombreManager")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="call"></ion-icon> Tel. Manager
        </p>
        <input
          id="TelefonoManager"
          name="TelefonoManager"
          placeholder="Escriba aquí..."
          {...register("TelefonoManager", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("TelefonoManager")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="reader"></ion-icon> No. Licencia
        </p>
        <input
          id="NumeroLicenciaAgencia"
          name="NumeroLicenciaAgencia"
          placeholder="Escriba aquí..."
          {...register("NumeroLicenciaAgencia", {
            pattern: REGEX_SOLO_NUMEROS,
          })}
        ></input>
        {MensajeError("NumeroLicenciaAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="reader"></ion-icon> No. Sales Tax
        </p>
        <input
          id="NumeroImpuestosVenta"
          name="NumeroImpuestosVenta"
          placeholder="Escriba aquí..."
          {...register("NumeroImpuestosVenta", {
            pattern: REGEX_SOLO_NUMEROS,
          })}
        ></input>
        {MensajeError("NumeroImpuestosVenta")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="reader"></ion-icon> S.S
        </p>
        <input
          id="SS"
          name="SS"
          placeholder="Escriba aquí..."
          {...register("SS", {
            pattern: REGEX_SOLO_NUMEROS,
          })}
        ></input>
        {MensajeError("SS")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="copy"></ion-icon> Copia ID
        </p>
        <select name="CopiaID" id="CopiaID" {...register("CopiaID")}>
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
        {MensajeError("CopiaID")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="copy"></ion-icon> Copia Licencia
        </p>
        <select
          name="CopiaLicenciaNegocio"
          id="CopiaLicenciaNegocio"
          {...register("CopiaLicenciaNegocio")}
        >
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
        {MensajeError("CopiaLicenciaNegocio")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="copy"></ion-icon> Copia Sales Tax
        </p>
        <select
          name="CopiaImpuestosVenta"
          id="CopiaImpuestosVenta"
          {...register("CopiaImpuestosVenta")}
        >
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
        {MensajeError("CopiaImpuestosVenta")}
      </span>
      <footer className="EditarAgencia__Footer">
        <button type="submit" className="EditarAgencia__Footer__Boton Guardar">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
