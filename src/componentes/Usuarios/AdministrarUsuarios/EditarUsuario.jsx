/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_EDITAR_USUARIO,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_BOTONES,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../../helpers/Regexs";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";
import { TIPOS_DE_USUARIOS } from "../../../helpers/TiposDeUsuario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/EditarUsuario.css";

export default function EditarUsuario({
  idioma,
  informacionDelUsuario,
  establecerVista,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);
  const { ActualizarInformacionDeUnUsuario } = useUsuarios();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("Usuario", informacionDelUsuario?.Usuario);
    setValue("Permisos", informacionDelUsuario?.Permisos);
    setValue("Contraseña", informacionDelUsuario?.Contraseña);
    setValue("ContraseñaConfirmar", informacionDelUsuario?.Contraseña);
  }, []);

  const ActualizarInformacionDelUsuario = handleSubmit(async (info) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    // SI LAS CONTRASEÑAS NO COINCIDEN, MOSTRAMOS UNA ALERTA
    if (info.Contraseña !== info.ContraseñaConfirmar) {
      return toast.error(
        "¡Oops! Parece que las contraseñas no coinciden, por favor intente nuevamente.",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    establecerPeticionPendiente(true);
    try {
      info.idUsuario = informacionDelUsuario?.idUsuario;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionDeUnUsuario(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVista(0);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  const MostrarOcultarContraseña = () => {
    establecerMostrarContraseña(!mostrarContraseña);
    const CampoContraseña = document.querySelector("#Contraseña");
    const CampoContraseñaConfirmar = document.querySelector(
      "#ContraseñaConfirmar"
    );
    if (mostrarContraseña) {
      CampoContraseña.type = "password";
      CampoContraseñaConfirmar.type = "password";
    } else {
      CampoContraseña.type = "text";
      CampoContraseñaConfirmar.type = "text";
    }
  };

  const MensajeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarUsuario__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form className="EditarUsuario" onSubmit={ActualizarInformacionDelUsuario}>
      <div className="EditarUsuario__Opciones">
        <button
          className="EditarUsuario__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <button
          className="EditarUsuario__Opciones--Boton Contraseña"
          type="button"
          onClick={() => MostrarOcultarContraseña()}
        >
          <ion-icon name={mostrarContraseña ? "eye-off" : "eye"}></ion-icon>
        </button>
      </div>
      <h1 className="EditarUsuario__Titulo">
        {DICCIONARIO_EDITAR_USUARIO[idioma].EditarUsuario}
      </h1>
      <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_USUARIO[idioma].NombreDelUsuario}
        </p>
        <input
          id="Usuario"
          type="text"
          name="Usuario"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("Usuario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeError("Usuario")}
      </span>
      <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
        <p>
          <ion-icon name="hand-left"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_USUARIO[idioma].Permisos}
        </p>
        <select id="Permisos" name="Permisos" {...register("Permisos")}>
          {TIPOS_DE_USUARIOS.map((permiso) => (
            <option key={permiso} value={permiso}>
              {permiso}
            </option>
          ))}
        </select>
        {MensajeError("Permisos")}
      </span>
      <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
        <p>
          <ion-icon name="lock-closed"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_USUARIO[idioma].Contrasena}
        </p>
        <input
          id="Contraseña"
          type="password"
          name="Contraseña"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("Contraseña", {
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
        {MensajeError("Contraseña")}
      </span>
      <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
        <p>
          <ion-icon name="checkmark-done-circle"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_USUARIO[idioma].ConfirmarContrasena}
        </p>
        <input
          id="ContraseñaConfirmar"
          type="password"
          name="ContraseñaConfirmar"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ContraseñaConfirmar", {
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
        {MensajeError("ContraseñaConfirmar")}
      </span>
      <footer className="EditarUsuario__Footer">
        <button type="submit" className="EditarUsuario__Footer__Boton Guardar">
          {DICCIONARIO_BOTONES[idioma].Actualizar}
        </button>
      </footer>
    </form>
  );
}
