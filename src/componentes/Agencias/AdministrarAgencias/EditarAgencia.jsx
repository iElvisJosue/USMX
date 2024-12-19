/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../Globales/GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_ERROR, ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_EDITAR_AGENCIA,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_BOTONES,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/AdministrarAgencias/EditarAgencia.css";

export default function EditarAgencia({
  Idioma,
  informacionDeLaAgencia,
  establecerVista,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
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
  const { ActualizarInformacionAgencia } = useAgencias();

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
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
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
    establecerPeticionPendiente(true);
    try {
      info.idAgencia = informacionDeLaAgencia?.idAgencia;
      info.PaisAgencia = detallesDeLaDireccion.PAIS;
      info.CodigoPaisAgencia = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoAgencia = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoAgencia = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadAgencia = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalAgencia = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionAgencia = detallesDeLaDireccion.DIRECCION;
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
    } finally {
      establecerPeticionPendiente(false);
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
        {DICCIONARIO_EDITAR_AGENCIA[Idioma].EditarAgencia}
      </h1>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="business"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NombreDeLaAgencia}
        </p>
        <input
          id="NombreAgencia"
          name="NombreAgencia"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          tabIndex={-1}
          {...register("NombreAgencia", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreAgencia")}
      </span>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="briefcase"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NombreLegalDeLaAgencia}
        </p>
        <input
          id="NombreLegalAgencia"
          name="NombreLegalAgencia"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreLegalAgencia", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreLegalAgencia")}
      </span>
      <GoogleAPI {...PropsGoogleAPI} />
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].TelAgencia}
        </p>
        <input
          id="TelefonoAgencia"
          name="TelefonoAgencia"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("TelefonoAgencia", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoAgencia")}
      </span>
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="print"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].Fax}
        </p>
        <input
          id="FaxAgencia"
          name="FaxAgencia"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("FaxAgencia", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("FaxAgencia")}
      </span>
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].CorreoAgencia}
        </p>
        <input
          id="CorreoAgencia"
          name="CorreoAgencia"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("CorreoAgencia", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("CorreoAgencia")}
      </span>
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].CorreoAgencia2}
        </p>
        <input
          id="CorreoAgenciaSecundario"
          name="CorreoAgenciaSecundario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("CorreoAgenciaSecundario", {
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("CorreoAgenciaSecundario")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NombreRepresentanteVentas}
        </p>
        <input
          id="RepresentanteVentas"
          name="RepresentanteVentas"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("RepresentanteVentas", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("RepresentanteVentas")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].TelRepresentante}
        </p>
        <input
          id="TelefonoRepresentanteVentas"
          name="TelefonoRepresentanteVentas"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("TelefonoRepresentanteVentas", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoRepresentanteVentas")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NombreDelDueño}
        </p>
        <input
          id="NombreDueno"
          name="NombreDueno"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreDueno", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreDueno")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].TelDueño}
        </p>
        <input
          id="TelefonoDueno"
          name="TelefonoDueno"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("TelefonoDueno", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoDueno")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NombreDelManager}
        </p>
        <input
          id="NombreManager"
          name="NombreManager"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreManager", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreManager")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].TelManager}
        </p>
        <input
          id="TelefonoManager"
          name="TelefonoManager"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("TelefonoManager", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoManager")}
      </span>
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="reader"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NoLicencia}
        </p>
        <input
          id="NumeroLicenciaAgencia"
          name="NumeroLicenciaAgencia"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NumeroLicenciaAgencia", {
            pattern: REGEX_SOLO_NUMEROS,
          })}
        ></input>
        {MensajeError("NumeroLicenciaAgencia")}
      </span>
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="reader"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].NoSalesTax}
        </p>
        <input
          id="NumeroImpuestosVenta"
          name="NumeroImpuestosVenta"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NumeroImpuestosVenta", {
            pattern: REGEX_SOLO_NUMEROS,
          })}
        ></input>
        {MensajeError("NumeroImpuestosVenta")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="reader"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].SS}
        </p>
        <input
          id="SS"
          name="SS"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("SS", {
            pattern: REGEX_SOLO_NUMEROS,
          })}
        ></input>
        {MensajeError("SS")}
      </span>
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="copy"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].CopiaID}
        </p>
        <select name="CopiaID" id="CopiaID" {...register("CopiaID")}>
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
        {MensajeError("CopiaID")}
      </span>
      <span className="GrupoDeInputs Dos AgenciaDos">
        <p>
          <ion-icon name="copy"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].CopiaLicencia}
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
      <span className="GrupoDeInputs AgenciaUno">
        <p>
          <ion-icon name="copy"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_AGENCIA[Idioma].CopiaSalesTax}
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
          {DICCIONARIO_BOTONES[Idioma].Actualizar}
        </button>
      </footer>
    </form>
  );
}
