/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../../context/OcurreContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_REGISTRAR_OCURRE,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Ocurres/RegistrarOcurre/RegistrarOcurre.css";

export default function RegistrarOcurre({ Idioma }) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
  const { RegistrarOcurre } = useOcurre();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardarInformacionDelOcurre = handleSubmit(async (info) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para registrar el ocurre, debe seleccionar una dirección!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    establecerPeticionPendiente(true);
    try {
      info.PaisOcurre = detallesDeLaDireccion.PAIS;
      info.CodigoPaisOcurre = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoOcurre = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoOcurre = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadOcurre = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalOcurre = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionOcurre = detallesDeLaDireccion.DIRECCION;
      const res = await RegistrarOcurre(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        CancelarRegistro();
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
    ciudadesPermitidas: ["mx"],
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarOcurre__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  const CancelarRegistro = () => {
    reset();
    establecerDireccion(null);
    establecerDetallesDeLaDireccion(null);
  };

  return (
    <div className="RegistrarOcurre">
      <form
        className="RegistrarOcurre__InformacionOcurre"
        onSubmit={GuardarInformacionDelOcurre}
      >
        <h1 className="RegistrarOcurre__InformacionOcurre__Titulo">
          {DICCIONARIO_REGISTRAR_OCURRE[Idioma].RegistrarOcurre}
        </h1>
        <span className="RegistrarOcurre__InformacionOcurre__Campo">
          <p>
            <ion-icon name="alert-circle"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_OCURRE[Idioma].NombreDelOcurre}
          </p>
          <input
            id="NombreOcurre"
            type="text"
            name="NombreOcurre"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("NombreOcurre", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
              },
            })}
          />
          {MensajeError("NombreOcurre")}
        </span>
        <span className="RegistrarOcurre__InformacionOcurre__Campo">
          <p>
            <ion-icon name="business"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_OCURRE[Idioma].OperadorLogistico}
          </p>
          <select
            name="OperadorLogisticoOcurre"
            id="OperadorLogisticoOcurre"
            {...register("OperadorLogisticoOcurre")}
          >
            <option value="FedEx">FedEx</option>
            <option value="Estafeta">Estafeta</option>
            <option value="DHL">DHL</option>
            <option value="UPS">UPS</option>
            <option value="Paquetexpress">Paquetexpress</option>
            <option value="Redpack">Redpack</option>
            <option value="99 Minutos">99 Minutos</option>
          </select>
        </span>
        <span className="RegistrarOcurre__InformacionOcurre__Campo">
          <p>
            <ion-icon name="call"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_OCURRE[Idioma].TelefonoUno}
          </p>
          <input
            id="TelefonoUnoOcurre"
            type="text"
            name="TelefonoUnoOcurre"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("TelefonoUnoOcurre", {
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
          />
          {MensajeError("TelefonoUnoOcurre")}
        </span>
        <span className="RegistrarOcurre__InformacionOcurre__Campo">
          <p>
            <ion-icon name="call"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_OCURRE[Idioma].TelefonoDos}
          </p>
          <input
            id="TelefonoDosOcurre"
            type="text"
            name="TelefonoDosOcurre"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("TelefonoDosOcurre", {
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
          />
          {MensajeError("TelefonoDosOcurre")}
        </span>
        <span className="RegistrarOcurre__InformacionOcurre__Campo Dos">
          <p>
            <ion-icon name="mail"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_OCURRE[Idioma].CorreoElectronico}
          </p>
          <input
            id="CorreoOcurre"
            type="text"
            name="CorreoOcurre"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("CorreoOcurre", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
              },
            })}
          />
          {MensajeError("CorreoOcurre")}
        </span>
        <span className="RegistrarOcurre__InformacionOcurre__Campo Tres">
          <p>
            <ion-icon name="document-text"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_OCURRE[Idioma].Observaciones}
          </p>
          <input
            name="ObservacionesOcurre"
            id="ObservacionesOcurre"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("ObservacionesOcurre", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 1000,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max1000,
              },
            })}
          ></input>
          {MensajeError("ObservacionesOcurre")}
        </span>
        <GoogleAPI {...PropsGoogleAPI} />
        <footer className="RegistrarOcurre__InformacionOcurre__Footer">
          <button
            className="RegistrarOcurre__InformacionOcurre__Footer__Boton Regresar"
            type="button"
            onClick={CancelarRegistro}
          >
            {DICCIONARIO_BOTONES[Idioma].Cancelar}
          </button>
          <button
            type="submit"
            className="RegistrarOcurre__InformacionOcurre__Footer__Boton Siguiente"
          >
            {DICCIONARIO_BOTONES[Idioma].Guardar}
          </button>
        </footer>
      </form>
    </div>
  );
}
