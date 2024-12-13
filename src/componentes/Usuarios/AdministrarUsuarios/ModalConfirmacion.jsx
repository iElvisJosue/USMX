/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_MODAL_CONFIRMACION_USUARIO } from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/ModalConfirmacion.css";

export default function ModalConfirmacion({
  Idioma,
  Activar = true,
  infUsuario,
  establecerMostrarModalConfirmacion,
  obtenerUsuariosNuevamente,
  establecerObtenerUsuariosNuevamente,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { ActualizarEstadoUsuario } = useUsuarios();

  const ClaseTituloModal = Activar
    ? "ModalConfirmacion__Contenido--Titulo Activar"
    : "ModalConfirmacion__Contenido--Titulo Desactivar";
  const TituloModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].ActivarUsuario
    : DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].DesactivarUsuario;
  const ClaseBotonModal = Activar
    ? "ModalConfirmacion__Contenido--Boton Activar"
    : "ModalConfirmacion__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].Activar
    : DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].Desactivar;
  const ClaseTextoModal = Activar
    ? "ModalConfirmacion__Contenido--Texto Activar"
    : "ModalConfirmacion__Contenido--Texto Desactivar";
  const EstadoUsuarioParaBD = Activar ? "Activo" : "Desactivado";

  const ActivarDesactivarUsuario = async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarEstadoUsuario({
        idUsuario: infUsuario.idUsuario,
        EstadoUsuario: EstadoUsuarioParaBD,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerUsuariosNuevamente(!obtenerUsuariosNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerMostrarModalConfirmacion(false);
      establecerPeticionPendiente(false);
    }
  };

  return (
    <div className="ModalConfirmacion">
      <article className="ModalConfirmacion__Contenido">
        <button
          className="ModalConfirmacion__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          {DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].MensajeParteUno}{" "}
          {Activar
            ? DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].Activar
            : DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].Desactivar}{" "}
          {DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].MensajeParteDos}{" "}
          <b>{infUsuario.Usuario}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma].MensajeActivar
              : DICCIONARIO_MODAL_CONFIRMACION_USUARIO[Idioma]
                  .MensajeDesactivar}
          </i>
        </small>
        <button
          className={ClaseBotonModal}
          onClick={() => ActivarDesactivarUsuario()}
        >
          {TextoBotonModal}
        </button>
      </article>
    </div>
  );
}
