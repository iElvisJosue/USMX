/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Movimientos/ModalConfirmacionMovimientos.css";

export default function ModalConfirmacionMovimientos({
  Activar = true,
  informacionDelMovimiento,
  establecerMostrarModalConfirmacion,
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
}) {
  const { ActualizarEstadoDeUnMovimiento } = useOperaciones();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacionMovimientos__Contenido--Titulo Activar"
    : "ModalConfirmacionMovimientos__Contenido--Titulo Desactivar";
  const TituloModal = Activar ? "Activar movimiento" : "Desactivar movimiento";
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionMovimientos__Contenido--Boton Activar"
    : "ModalConfirmacionMovimientos__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar ? "Activar" : "Desactivar";
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionMovimientos__Contenido--Texto Activar"
    : "ModalConfirmacionMovimientos__Contenido--Texto Desactivar";
  const EstadoMovimientoParaBD = Activar ? "Activo" : "Desactivado";

  const ActivarDesactivarUsuario = async () => {
    try {
      const res = await ActualizarEstadoDeUnMovimiento({
        CookieConToken: COOKIE_CON_TOKEN,
        idListaMovimiento: informacionDelMovimiento.idListaMovimiento,
        ActivoMovimiento: EstadoMovimientoParaBD,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
      }
      establecerObtenerMovimientosNuevamente(!obtenerMovimientosNuevamente);
      establecerMostrarModalConfirmacion(false);
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
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
          ¿Esta seguro que desea {Activar ? "activar" : "desactivar"} el
          movimiento <b>{informacionDelMovimiento.DetallesMovimiento}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? `El movimiento se activara una vez confirmada esta acción, por lo cual, el movimiento ${informacionDelMovimiento.DetallesMovimiento} podrá trabajar con normalidad en el sistema.`
              : `El movimiento se desactivara una vez confirmada esta opción, por lo cual, con el movimiento ${informacionDelMovimiento.DetallesMovimiento} no sé podrá realizar ninguna operación.`}
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
