/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { REGEX_CORREO, REGEX_SOLO_NUMEROS } from "../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/Componentes/Perfil/PerfilActualizarInformacion.css";

export default function PerfilActualizarInformacion({
  idioma,
  infUsuario,
  cargarInfUsuarioNuevamente,
  establecerCargarInfUsuarioNuevamente,
  establecerVistaPerfil,
}) {
  const { ActualizarInformacionPersonalUsuario } = useUsuarios();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("Usuario", infUsuario.Usuario);
    setValue("Correo", infUsuario.Correo);
    setValue("Telefono", infUsuario.Telefono);
  }, []);

  const PerfilActualizarInformacion = handleSubmit(async (data) => {
    try {
      const res = await ActualizarInformacionPersonalUsuario({
        idUsuario: infUsuario.idUsuario,
        Usuario: data.Usuario,
        Correo: data.Correo,
        Telefono: data.Telefono,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerCargarInfUsuarioNuevamente(!cargarInfUsuarioNuevamente);
        establecerVistaPerfil(0);
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
              className="PerfilActualizarInformacion__MensajeDeError"
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
      className="PerfilActualizarInformacion"
      onSubmit={PerfilActualizarInformacion}
    >
      <span className="PerfilActualizarInformacion__Boton">
        <button type="button" onClick={() => establecerVistaPerfil(0)}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      </span>
      <h1 className="PerfilActualizarInformacion__Titulo">
        👤
        <br />
        {
          DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION[idioma]
            .ActualizarInformacionPersonal
        }
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION[idioma].Usuario}
        </p>
        <input
          id="Usuario"
          type="text"
          name="Usuario"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("Usuario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            maxLength: {
              value: 255,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max255,
            },
          })}
        />
        {MensajeDeErrorInput("Usuario")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION[idioma].Correo}
        </p>
        <input
          id="Correo"
          type="text"
          name="Correo"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("Correo", {
            maxLength: {
              value: 255,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max255,
            },
            pattern: REGEX_CORREO,
          })}
        />
        {MensajeDeErrorInput("Correo")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION[idioma].Telefono}
        </p>
        <input
          id="Telefono"
          type="text"
          name="Telefono"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("Telefono", {
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
            },
            pattern: REGEX_SOLO_NUMEROS,
          })}
        />
        {MensajeDeErrorInput("Telefono")}
      </span>
      <small className="PerfilActualizarInformacion__MensajeEncriptado">
        📣
        <br />
        {DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION[idioma].MensajeActualizarUno}
        <br />
        {DICCIONARIO_PERFIL_ACTUALIZAR_INFORMACION[idioma].MensajeActualizarDos}
      </small>
      <footer className="PerfilActualizarInformacion__Footer">
        <button
          type="submit"
          className="PerfilActualizarInformacion__Footer__Boton Guardar"
        >
          {DICCIONARIO_BOTONES[idioma].Guardar}
        </button>
      </footer>
    </form>
  );
}
