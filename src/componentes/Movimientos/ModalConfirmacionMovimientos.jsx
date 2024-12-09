/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";
import { MensajePeticionPendiente } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS } from "../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Movimientos/ModalConfirmacionMovimientos.css";

export default function ModalConfirmacionMovimientos({
  idioma,
  Activar = true,
  informacionDelMovimiento,
  establecerMostrarModalConfirmacion,
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { ActualizarEstadoDeUnMovimiento } = useOperaciones();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacionMovimientos__Contenido--Titulo Activar"
    : "ModalConfirmacionMovimientos__Contenido--Titulo Desactivar";
  const TituloModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].ActivarMovimiento
    : DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].DesactivarMovimiento;
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionMovimientos__Contenido--Boton Activar"
    : "ModalConfirmacionMovimientos__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].Activar
    : DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].Desactivar;
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionMovimientos__Contenido--Texto Activar"
    : "ModalConfirmacionMovimientos__Contenido--Texto Desactivar";
  const EstadoMovimientoParaBD = Activar ? "Activo" : "Desactivado";

  const ActivarDesactivarMovimiento = async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarEstadoDeUnMovimiento({
        CookieConToken: COOKIE_CON_TOKEN,
        idMovimiento: informacionDelMovimiento.idMovimiento,
        ActivoMovimiento: EstadoMovimientoParaBD,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerMovimientosNuevamente(!obtenerMovimientosNuevamente);
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
    <div className="ModalConfirmacionMovimientos">
      <article className="ModalConfirmacionMovimientos__Contenido">
        <button
          className="ModalConfirmacionMovimientos__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          {DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].MensajeParteUno}{" "}
          {Activar
            ? DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].Activar
            : DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma]
                .Desactivar}{" "}
          {DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma].MensajeParteDos}{" "}
          <b>{informacionDelMovimiento.DetallesMovimiento}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma]
                  .MensajeActivar
              : DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS[idioma]
                  .MensajeDesactivar}
          </i>
        </small>
        <button
          className={ClaseBotonModal}
          onClick={() => ActivarDesactivarMovimiento()}
        >
          {TextoBotonModal}
        </button>
      </article>
    </div>
  );
}
