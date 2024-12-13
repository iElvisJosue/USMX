/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ModalInformacionDeLaAgencia.css";

export default function ModalInformacionDeLaAgencia({
  Idioma,
  informacionDelProducto,
  informacionDeLaAgencia,
  establecerMostrarModal,
  buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { AsignarAgenciaAlProducto } = useProductos();

  const PeticionAsignarAgenciaAlProducto = async (idAgencia) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await AsignarAgenciaAlProducto({
        idAgencia,
        idProducto: informacionDelProducto.idProducto,
        PrecioProducto: informacionDelProducto.PrecioProducto,
        ComisionProducto: informacionDelProducto.ComisionProducto,
        LibraExtraProducto: informacionDelProducto.LibraExtraProducto,
        PesoSinCobroProducto: informacionDelProducto.PesoSinCobroProducto,
        PesoMaximoProducto: informacionDelProducto.PesoMaximoProducto,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto(
          !buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto
        );
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
      establecerMostrarModal(false);
    }
  };

  return (
    <div className="ModalInformacionDeLaAgenciaProductos">
      <article className="ModalInformacionDeLaAgenciaProductos__Contenido">
        <button
          className="ModalInformacionDeLaAgenciaProductos__Contenido--CerrarModal"
          onClick={() => establecerMostrarModal(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDeLaAgenciaProductos__Contenido--Titulo">
          {
            DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO[Idioma]
              .InformacionDeLaAgencia
          }
        </h1>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion Col2">
          <ion-icon name="business"></ion-icon>
          <b>
            {
              DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO[Idioma]
                .Agencia
            }
          </b>
          {informacionDeLaAgencia.NombreAgencia}
          {informacionDeLaAgencia.NombreLegalAgencia && (
            <>
              <br />
              {informacionDeLaAgencia.NombreLegalAgencia}
            </>
          )}
        </small>

        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion">
          <ion-icon name="person-circle"></ion-icon>
          <b>
            {
              DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO[Idioma]
                .Representante
            }
          </b>{" "}
          {informacionDeLaAgencia.RepresentanteVentas || "N/A"} <br />
          {informacionDeLaAgencia.TelefonoRepresentanteVentas && (
            <>Tel. {informacionDeLaAgencia.TelefonoRepresentanteVentas}</>
          )}
        </small>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>
            {
              DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO[Idioma]
                .TelAgencia
            }
          </b>{" "}
          {informacionDeLaAgencia.TelefonoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>
            {
              DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO[Idioma]
                .Correos
            }
          </b>{" "}
          {informacionDeLaAgencia.CorreoAgencia}
          {informacionDeLaAgencia.CorreoAgenciaSecundario && (
            <>
              <br />
              {informacionDeLaAgencia.CorreoAgenciaSecundario}
            </>
          )}
        </small>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion Col2">
          <ion-icon name="location"></ion-icon>
          <b>
            {
              DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO[Idioma]
                .Locacion
            }
          </b>
          {informacionDeLaAgencia.PaisAgencia}
          <br />
          {informacionDeLaAgencia.CiudadAgencia},{" "}
          {informacionDeLaAgencia.EstadoAgencia},{" "}
          {informacionDeLaAgencia.DireccionAgencia}{" "}
          {informacionDeLaAgencia.CodigoPostalAgencia}
        </small>
        {informacionDeLaAgencia.Editable && (
          <button
            className="ModalInformacionDeLaAgenciaProductos__Contenido--Boton"
            onClick={() =>
              PeticionAsignarAgenciaAlProducto(informacionDeLaAgencia.idAgencia)
            }
          >
            {DICCIONARIO_BOTONES[Idioma].Asignar}
          </button>
        )}
      </article>
    </div>
  );
}
