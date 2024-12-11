/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_REGISTRAR_AGENCIA,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/RegistrarAgencia/RegistrarAgencia.css";

export default function RegistrarAgencia({ idioma }) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
  const { RegistrarAgencia } = useAgencias();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDeLaAgencia = handleSubmit(async (info) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para registrar la agencia, debe seleccionar una dirección!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    establecerPeticionPendiente(true);
    try {
      info.PaisAgencia = detallesDeLaDireccion.PAIS;
      info.CodigoPaisAgencia = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoAgencia = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoAgencia = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadAgencia = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalAgencia = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionAgencia = detallesDeLaDireccion.DIRECCION;
      const res = await RegistrarAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        ReiniciarFormulario();
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
  const ReiniciarFormulario = () => {
    reset();
    establecerDireccion(null);
    establecerDetallesDeLaDireccion(null);
  };

  return (
    <div className="RegistrarAgencia">
      <form
        className="RegistrarAgencia__InformacionDeLaAgencia"
        onSubmit={GuardaInformacionDeLaAgencia}
      >
        <h1 className="RegistrarAgencia__InformacionDeLaAgencia__Titulo">
          {DICCIONARIO_REGISTRAR_AGENCIA[idioma].RegistrarAgencia}
        </h1>
        <span className="GrupoDeInputs Dos">
          <p>
            <ion-icon name="business"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NombreDeLaAgencia}
          </p>
          <input
            id="NombreAgencia"
            name="NombreAgencia"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            tabIndex={-1}
            {...register("NombreAgencia", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("NombreAgencia")}
        </span>
        <span className="GrupoDeInputs Dos">
          <p>
            <ion-icon name="briefcase"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NombreLegalDeLaAgencia}
          </p>
          <input
            id="NombreLegalAgencia"
            name="NombreLegalAgencia"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("NombreLegalAgencia", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("NombreLegalAgencia")}
        </span>
        <GoogleAPI {...PropsGoogleAPI} />
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="call"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].TelAgencia}
          </p>
          <input
            id="TelefonoAgencia"
            name="TelefonoAgencia"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("TelefonoAgencia", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
              },
            })}
          />
          {MensajeError("TelefonoAgencia")}
        </span>
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="print"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].Fax}
          </p>
          <input
            id="FaxAgencia"
            name="FaxAgencia"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("FaxAgencia", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
              },
            })}
          />
          {MensajeError("FaxAgencia")}
        </span>
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="mail"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].CorreoAgencia}
          </p>
          <input
            id="CorreoAgencia"
            name="CorreoAgencia"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("CorreoAgencia", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("CorreoAgencia")}
        </span>
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="mail"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].CorreoAgencia2}
          </p>
          <input
            id="CorreoAgenciaSecundario"
            name="CorreoAgenciaSecundario"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("CorreoAgenciaSecundario", {
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("CorreoAgenciaSecundario")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="person"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NombreRepresentanteVentas}
          </p>
          <input
            id="RepresentanteVentas"
            name="RepresentanteVentas"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("RepresentanteVentas", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("RepresentanteVentas")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="call"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].TelRepresentante}
          </p>
          <input
            id="TelefonoRepresentanteVentas"
            name="TelefonoRepresentanteVentas"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("TelefonoRepresentanteVentas", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
              },
            })}
          />
          {MensajeError("TelefonoRepresentanteVentas")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="person"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NombreDelDueño}
          </p>
          <input
            id="NombreDueno"
            name="NombreDueno"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("NombreDueno", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("NombreDueno")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="call"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].TelDueño}
          </p>
          <input
            id="TelefonoDueno"
            name="TelefonoDueno"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("TelefonoDueno", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
              },
            })}
          />
          {MensajeError("TelefonoDueno")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="person"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NombreDelManager}
          </p>
          <input
            id="NombreManager"
            name="NombreManager"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("NombreManager", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
              },
            })}
          />
          {MensajeError("NombreManager")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="call"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].TelManager}
          </p>
          <input
            id="TelefonoManager"
            name="TelefonoManager"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("TelefonoManager", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
              },
            })}
          />
          {MensajeError("TelefonoManager")}
        </span>
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="reader"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NoLicencia}
          </p>
          <input
            id="NumeroLicenciaAgencia"
            name="NumeroLicenciaAgencia"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("NumeroLicenciaAgencia", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          />
          {MensajeError("NumeroLicenciaAgencia")}
        </span>
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="reader"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].NoSalesTax}
          </p>
          <input
            id="NumeroImpuestosVenta"
            name="NumeroImpuestosVenta"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("NumeroImpuestosVenta", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          />
          {MensajeError("NumeroImpuestosVenta")}
        </span>
        <span className="GrupoDeInputs Dos AgenciaDos">
          <p>
            <ion-icon name="reader"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].SS}
          </p>
          <input
            id="SS"
            name="SS"
            placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
            {...register("SS", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          />
          {MensajeError("SS")}
        </span>
        <span className="GrupoDeInputs AgenciaUno">
          <p>
            <ion-icon name="copy"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].CopiaID}
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
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].CopiaLicencia}
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
            {DICCIONARIO_REGISTRAR_AGENCIA[idioma].CopiaSalesTax}
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
        <footer className="RegistrarAgencia__InformacionDeLaAgencia__Footer">
          <button
            type="button"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            {DICCIONARIO_BOTONES[idioma].Cancelar}
          </button>
          <button
            type="submit"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Guardar"
          >
            {DICCIONARIO_BOTONES[idioma].Guardar}
          </button>
        </footer>
      </form>
    </div>
  );
}
