/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { ESTILOS_WARNING } from "../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/Componentes/Perfil/PerfilActualizarContraseña.css";

export default function PerfilActualizarContraseña({
  idioma,
  infUsuario,
  cargarInfUsuarioNuevamente,
  establecerCargarInfUsuarioNuevamente,
  establecerVistaPerfil,
}) {
  const { ActualizarContraseñaUsuario } = useUsuarios();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const PeticionActualizarContrasena = handleSubmit(async (data) => {
    const {
      ContraseñaActual,
      ContraseñaNuevaUsuario,
      ConfirmarContraseñaUsuario,
    } = data;

    if (ContraseñaNuevaUsuario !== ConfirmarContraseñaUsuario) {
      return toast.error(
        "¡Oops! Parece que las contraseñas no son iguales, por favor vuelve a intentarlo.",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    try {
      const res = await ActualizarContraseñaUsuario({
        idUsuario: infUsuario.idUsuario,
        ContraseñaActual,
        ContraseñaNuevaUsuario,
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
              className="PerfilActualizarContraseña__MensajeDeError"
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
      className="PerfilActualizarContraseña"
      onSubmit={PeticionActualizarContrasena}
    >
      <span className="PerfilActualizarContraseña__Boton">
        <button type="button" onClick={() => establecerVistaPerfil(0)}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      </span>
      <h1 className="PerfilActualizarInformacion__Titulo">
        🔐
        <br />
        {DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA[idioma].ActualizarContraseña}
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="time"></ion-icon>{" "}
          {DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA[idioma].ContraseñaActual}
        </p>
        <input
          id="ContraseñaActual"
          type="password"
          name="ContraseñaActual"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ContraseñaActual", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
            minLength: {
              value: 4,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min4,
            },
          })}
        />
        {MensajeDeErrorInput("ContraseñaActual")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="lock-closed"></ion-icon>{" "}
          {DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA[idioma].ContraseñaNueva}
        </p>
        <input
          id="ContraseñaNuevaUsuario"
          type="password"
          name="ContraseñaNuevaUsuario"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ContraseñaNuevaUsuario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
            minLength: {
              value: 4,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min4,
            },
          })}
        />
        {MensajeDeErrorInput("ContraseñaNuevaUsuario")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="checkmark-circle"></ion-icon>{" "}
          {DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA[idioma].ConfirmarContraseña}
        </p>
        <input
          id="ConfirmarContraseñaUsuario"
          type="password"
          name="ConfirmarContraseñaUsuario"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ConfirmarContraseñaUsuario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
            minLength: {
              value: 4,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min4,
            },
          })}
        />
        {MensajeDeErrorInput("ConfirmarContraseñaUsuario")}
      </span>
      <small className="PerfilActualizarContraseña__MensajeEncriptado">
        📣
        <br />
        {DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA[idioma].MensajeActualizarUno}
        <br />
        {DICCIONARIO_PERFIL_ACTUALIZAR_CONTRASEÑA[idioma].MensajeActualizarDos}
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
