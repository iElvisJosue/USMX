/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../context/OcurreContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AdministrarOcurres/ModalConfirmacionOcurres.css";

export default function ModalConfirmacionOcurres({
  Activar = true,
  infOcurre,
  establecerMostrarModalConfirmacion,
  obtenerOcurresNuevamente,
  establecerObtenerOcurresNuevamente,
}) {
  const { ActualizarEstadoOcurre } = useOcurre();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacionOcurres__Contenido--Titulo Activar"
    : "ModalConfirmacionOcurres__Contenido--Titulo Desactivar";
  const TituloModal = Activar ? "Activar ocurre" : "Desactivar ocurre";
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionOcurres__Contenido--Boton Activar"
    : "ModalConfirmacionOcurres__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar ? "Activar" : "Desactivar";
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionOcurres__Contenido--Texto Activar"
    : "ModalConfirmacionOcurres__Contenido--Texto Desactivar";
  const EstadoOcurreBD = Activar ? "Activa" : "Desactivada";

  const ActivarDesactivarOcurre = async () => {
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
      }
      establecerObtenerOcurresNuevamente(!obtenerOcurresNuevamente);
      establecerMostrarModalConfirmacion(false);
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
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
          ¿Esta seguro que desea {Activar ? "activar" : "desactivar"} el ocurre{" "}
          <b>{infOcurre.NombreOcurre}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? `El ocurre se activara una vez confirmada esta acción, por lo cual, el ocurre ${infOcurre.NombreOcurre} podrá trabajar con normalidad en el sistema.`
              : `El ocurre se desactivara una vez confirmada esta opción, por lo cual, con el ocurre ${infOcurre.NombreOcurre} no sé podrá realizar ninguna operación.`}
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
