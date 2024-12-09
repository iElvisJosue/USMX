/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../../context/OcurreContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_MODAL_CONFIRMACION_OCURRE } from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ocurres/AdministrarOcurres/ModalConfirmacionOcurres.css";

export default function ModalConfirmacionOcurres({
  idioma,
  Activar = true,
  infOcurre,
  establecerMostrarModalConfirmacion,
  obtenerOcurresNuevamente,
  establecerObtenerOcurresNuevamente,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { ActualizarEstadoOcurre } = useOcurre();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacionOcurres__Contenido--Titulo Activar"
    : "ModalConfirmacionOcurres__Contenido--Titulo Desactivar";
  const TituloModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].ActivarOcurre
    : DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].DesactivarOcurre;
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionOcurres__Contenido--Boton Activar"
    : "ModalConfirmacionOcurres__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].Activar
    : DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].Desactivar;
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionOcurres__Contenido--Texto Activar"
    : "ModalConfirmacionOcurres__Contenido--Texto Desactivar";
  const EstadoOcurreBD = Activar ? "Activa" : "Desactivada";

  const ActivarDesactivarOcurre = async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarEstadoOcurre({
        idOcurre: infOcurre.idOcurre,
        StatusOcurre: EstadoOcurreBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerOcurresNuevamente(!obtenerOcurresNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
      establecerMostrarModalConfirmacion(false);
    }
  };

  return (
    <div className="ModalConfirmacionOcurres">
      <article className="ModalConfirmacionOcurres__Contenido">
        <button
          className="ModalConfirmacionOcurres__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          {DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].MensajeParteUno}{" "}
          {Activar
            ? DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].Activar
            : DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].Desactivar}{" "}
          {DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma].MensajeParteDos}{" "}
          <b>{infOcurre.NombreOcurre}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma]
                  .AdvertenciaUnoOcurre
              : DICCIONARIO_MODAL_CONFIRMACION_OCURRE[idioma]
                  .AdvertenciaDosOcurre}
          </i>
        </small>
        <button
          className={ClaseBotonModal}
          onClick={() => ActivarDesactivarOcurre()}
        >
          {TextoBotonModal}
        </button>
      </article>
    </div>
  );
}
