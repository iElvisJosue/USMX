/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS } from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ModalConfirmacionProductos.css";

export default function ModalConfirmacionProductos({
  Idioma,
  Activar = true,
  infProducto,
  establecerMostrarModalConfirmacion,
  buscarProductosNuevamente,
  establecerBuscarProductosNuevamente,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { ActualizarEstadoDeUnProducto } = useProductos();

  const ClaseTituloModal = Activar
    ? "ModalConfirmacionProductos__Contenido--Titulo Activar"
    : "ModalConfirmacionProductos__Contenido--Titulo Desactivar";
  const TituloModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].ActivarProducto
    : DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].DesactivarProducto;
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionProductos__Contenido--Boton Activar"
    : "ModalConfirmacionProductos__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar
    ? DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].Activar
    : DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].Desactivar;
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionProductos__Contenido--Texto Activar"
    : "ModalConfirmacionProductos__Contenido--Texto Desactivar";
  const EstadoProductoParaBD = Activar ? "Activo" : "Desactivado";

  const ActivarDesactivarProducto = async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarEstadoDeUnProducto({
        idProducto: infProducto.idProducto,
        StatusProducto: EstadoProductoParaBD,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarProductosNuevamente(!buscarProductosNuevamente);
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
    <div className="ModalConfirmacionProductos">
      <article className="ModalConfirmacionProductos__Contenido">
        <button
          className="ModalConfirmacionProductos__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          {DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].MensajeParteUno}{" "}
          {Activar
            ? DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].Activar
            : DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].Desactivar}{" "}
          {DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].MensajeParteDos}{" "}
          <b>{infProducto.NombreProducto}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma].MensajeActivar
              : DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS[Idioma]
                  .MensajeDesactivar}
          </i>
        </small>
        <button
          className={ClaseBotonModal}
          onClick={() => ActivarDesactivarProducto()}
        >
          {TextoBotonModal}
        </button>
      </article>
    </div>
  );
}
