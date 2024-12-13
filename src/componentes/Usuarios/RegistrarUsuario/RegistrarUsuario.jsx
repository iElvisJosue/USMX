/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_REGISTRAR_USUARIO,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_BOTONES,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../../helpers/Regexs";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";
import { TIPOS_DE_USUARIOS } from "../../../helpers/TiposDeUsuario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Usuarios/RegistrarUsuario/RegistrarUsuario.css";

export default function InformacionDelUsuario({ Idioma }) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);
  const { RegistrarUsuario } = useUsuarios();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDelUsuario = handleSubmit(async (info) => {
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
      const res = await RegistrarUsuario(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  const ReiniciarFormulario = () => {
    reset();
  };

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
    <div className="RegistrarUsuario">
      <form
        className="RegistrarUsuario__InformacionDelUsuario"
        onSubmit={GuardaInformacionDelUsuario}
      >
        <div className="RegistrarUsuario__InformacionDelUsuario__Opciones">
          <button
            className="RegistrarUsuario__InformacionDelUsuario__Opciones--Boton Contraseña"
            type="button"
            onClick={() => MostrarOcultarContraseña()}
          >
            <ion-icon name={mostrarContraseña ? "eye-off" : "eye"}></ion-icon>
          </button>
        </div>
        <h1 className="RegistrarUsuario__InformacionDelUsuario__Titulo">
          {DICCIONARIO_REGISTRAR_USUARIO[Idioma].RegistrarUsuario}
        </h1>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_USUARIO[Idioma].NombreDelUsuario}
          </p>
          <input
            id="Usuario"
            type="text"
            name="Usuario"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Usuario", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
              },
            })}
          />
          {MensajeError("Usuario")}
        </span>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="hand-left"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_USUARIO[Idioma].Permisos}
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
            {DICCIONARIO_REGISTRAR_USUARIO[Idioma].Contrasena}
          </p>
          <input
            id="Contraseña"
            type="password"
            name="Contraseña"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Contraseña", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
              },
              minLength: {
                value: 4,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min4,
              },
            })}
          />
          {MensajeError("Contraseña")}
        </span>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="checkmark-done-circle"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_USUARIO[Idioma].ConfirmarContrasena}
          </p>
          <input
            id="ContraseñaConfirmar"
            type="password"
            name="ContraseñaConfirmar"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("ContraseñaConfirmar", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
              },
              minLength: {
                value: 4,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min4,
              },
            })}
          />
          {MensajeError("ContraseñaConfirmar")}
        </span>
        <footer className="RegistrarUsuario__InformacionDelUsuario__Footer">
          <button
            type="button"
            className="RegistrarUsuario__InformacionDelUsuario__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            {DICCIONARIO_BOTONES[Idioma].Cancelar}
          </button>
          <button
            type="submit"
            className="RegistrarUsuario__InformacionDelUsuario__Footer__Boton Guardar"
          >
            {DICCIONARIO_BOTONES[Idioma].Guardar}
          </button>
        </footer>
      </form>
    </div>
  );
}
