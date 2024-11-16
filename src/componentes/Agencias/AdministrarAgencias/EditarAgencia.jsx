/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";
import { useConfiguracion } from "../../../context/ConfiguracionContext";

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
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/AdministrarAgencias/EditarAgencia.css";

export default function EditarAgencia({
  informacionDeLaAgencia,
  establecerVista,
}) {
  const { ActualizarInformacionAgencia } = useAgencias();
  const { idioma } = useConfiguracion();

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
      <h1 className="EditarAgencia__Titulo">
        {ListaDeIdiomas.VistaEditarAgencia[idioma].EditarAgencia}
      </h1>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="business"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NombreDeLaAgencia}
        </p>
        <input
          id="NombreAgencia"
          name="NombreAgencia"
          placeholder="Escriba aquí..."
          tabIndex={-1}
          {...register("NombreAgencia", {
            required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="briefcase"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NombreLegalDeLaAgencia}
        </p>
        <input
          id="NombreLegalAgencia"
          name="NombreLegalAgencia"
          placeholder="Escriba aquí..."
          {...register("NombreLegalAgencia", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreLegalAgencia")}
      </span>
      <GoogleAPI {...PropsGoogleAPI} />
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].TelAgencia}
        </p>
        <input
          id="TelefonoAgencia"
          name="TelefonoAgencia"
          placeholder="Escriba aquí..."
          {...register("TelefonoAgencia", {
            required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="print"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].Fax}
        </p>
        <input
          id="FaxAgencia"
          name="FaxAgencia"
          placeholder="Escriba aquí..."
          {...register("FaxAgencia", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("FaxAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].CorreoAgencia}
        </p>
        <input
          id="CorreoAgencia"
          name="CorreoAgencia"
          placeholder="Escriba aquí..."
          {...register("CorreoAgencia", {
            required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("CorreoAgencia")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].CorreoAgencia2}
        </p>
        <input
          id="CorreoAgenciaSecundario"
          name="CorreoAgenciaSecundario"
          placeholder="Escriba aquí..."
          {...register("CorreoAgenciaSecundario", {
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("CorreoAgenciaSecundario")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NombreRepresentanteVentas}
        </p>
        <input
          id="RepresentanteVentas"
          name="RepresentanteVentas"
          placeholder="Escriba aquí..."
          {...register("RepresentanteVentas", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("RepresentanteVentas")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].TelRepresentante}
        </p>
        <input
          id="TelefonoRepresentanteVentas"
          name="TelefonoRepresentanteVentas"
          placeholder="Escriba aquí..."
          {...register("TelefonoRepresentanteVentas", {
            required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoRepresentanteVentas")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NombreDelDueño}
        </p>
        <input
          id="NombreDueno"
          name="NombreDueno"
          placeholder="Escriba aquí..."
          {...register("NombreDueno", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreDueno")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].TelDueño}
        </p>
        <input
          id="TelefonoDueno"
          name="TelefonoDueno"
          placeholder="Escriba aquí..."
          {...register("TelefonoDueno", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoDueno")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NombreDelManager}
        </p>
        <input
          id="NombreManager"
          name="NombreManager"
          placeholder="Escriba aquí..."
          {...register("NombreManager", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreManager")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].TelManager}
        </p>
        <input
          id="TelefonoManager"
          name="TelefonoManager"
          placeholder="Escriba aquí..."
          {...register("TelefonoManager", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoManager")}
      </span>
      <span className="EditarAgencia__Titulo__Campo">
        <p>
          <ion-icon name="reader"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NoLicencia}
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
          <ion-icon name="reader"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].NoSalesTax}
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
          <ion-icon name="reader"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].SS}
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
          <ion-icon name="copy"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].CopiaID}
        </p>
        <select name="CopiaID" id="CopiaID" {...register("CopiaID")}>
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
        {MensajeError("CopiaID")}
      </span>
      <span className="EditarAgencia__Titulo__Campo Dos">
        <p>
          <ion-icon name="copy"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].CopiaLicencia}
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
          <ion-icon name="copy"></ion-icon>{" "}
          {ListaDeIdiomas.VistaEditarAgencia[idioma].CopiaSalesTax}
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
          {ListaDeIdiomas.Botones[idioma].Actualizar}
        </button>
      </footer>
    </form>
  );
}
