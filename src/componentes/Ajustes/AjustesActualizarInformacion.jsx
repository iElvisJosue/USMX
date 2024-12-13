/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS
import { useSistema } from "../../context/SistemaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_AJUSTES_INFORMACION_SISTEMA,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { REGEX_CORREO } from "../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ajustes/AjustesActualizarInformacion.css";

export default function AjustesActualizarInformacion({
  Idioma,
  infSistema,
  obtenerInformacionNuevamente,
  establecerObtenerInformacionNuevamente,
  establecerVistaAjustes,
}) {
  const { ActualizarInformacionDelSistema } = useSistema();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("NombreSistema", infSistema.NombreSistema);
    setValue("CorreoSistema", infSistema.CorreoSistema);
    setValue("ContrasenaCorreoSistema", infSistema.ContrasenaCorreoSistema);
  }, []);

  const AjustesActualizarInformacion = handleSubmit(async (data) => {
    try {
      const res = await ActualizarInformacionDelSistema({
        NombreSistema: data.NombreSistema,
        CorreoSistema: data.CorreoSistema,
        ContrasenaCorreoSistema: data.ContrasenaCorreoSistema,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
        establecerVistaAjustes(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const MensajeDeErrorInput = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small
              key={type}
              className="AjustesActualizarInformacion__MensajeDeError"
            >
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="AjustesActualizarInformacion"
      onSubmit={AjustesActualizarInformacion}
    >
      <span className="AjustesActualizarInformacion__Boton">
        <button type="button" onClick={() => establecerVistaAjustes(0)}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      </span>
      <h1 className="AjustesActualizarInformacion__Titulo">
        🖥️
        <br />
        {
          DICCIONARIO_AJUSTES_INFORMACION_SISTEMA[Idioma]
            .ActualizarInformacionDelSistema
        }
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="desktop"></ion-icon>{" "}
          {DICCIONARIO_AJUSTES_INFORMACION_SISTEMA[Idioma].NombreDelSistema}
        </p>
        <input
          id="NombreSistema"
          type="text"
          name="NombreSistema"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreSistema", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            maxLength: {
              value: 255,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max255,
            },
          })}
        />
        {MensajeDeErrorInput("NombreSistema")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {DICCIONARIO_AJUSTES_INFORMACION_SISTEMA[Idioma].CorreoDeContacto}
        </p>
        <input
          id="CorreoSistema"
          type="text"
          name="CorreoSistema"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("CorreoSistema", {
            maxLength: {
              value: 255,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max255,
            },
            pattern: REGEX_CORREO,
          })}
        />
        {MensajeDeErrorInput("CorreoSistema")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="lock-closed"></ion-icon>{" "}
          {
            DICCIONARIO_AJUSTES_INFORMACION_SISTEMA[Idioma]
              .ContrasenaCorreoDeContacto
          }
        </p>
        <input
          id="ContrasenaCorreoSistema"
          type="text"
          name="ContrasenaCorreoSistema"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("ContrasenaCorreoSistema", {
            maxLength: {
              value: 255,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max255,
            },
          })}
        />
        {MensajeDeErrorInput("ContrasenaCorreoSistema")}
      </span>
      <small className="AjustesActualizarInformacion__MensajeEncriptado">
        📣
        <br />
        {DICCIONARIO_AJUSTES_INFORMACION_SISTEMA[Idioma].MensajeActualizarUno}
        <br />
        {DICCIONARIO_AJUSTES_INFORMACION_SISTEMA[Idioma].MensajeActualizarDos}
      </small>
      <footer className="AjustesActualizarInformacion__Footer">
        <button
          type="submit"
          className="AjustesActualizarInformacion__Footer__Boton Guardar"
        >
          {DICCIONARIO_BOTONES[Idioma].Guardar}
        </button>
      </footer>
    </form>
  );
}
