/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ModalInformacionDeLaAgencia.css";

export default function ModalInformacionDeLaAgencia({
  informacionDelProducto,
  informacionDeLaAgencia,
  establecerMostrarModal,
  buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
}) {
  const { AsignarAgenciaAlProducto } = useProductos();

  const PeticionAsignarAgenciaAlProducto = async (idAgencia) => {
    try {
      const res = await AsignarAgenciaAlProducto({
        CookieConToken: COOKIE_CON_TOKEN,
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
        establecerMostrarModal(false);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
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
          Información de la agencia
        </h1>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion Col2">
          <ion-icon name="business"></ion-icon>
          <b>Agencia</b>
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
          <b>Representante</b>{" "}
          {informacionDeLaAgencia.RepresentanteVentas || "N/A"} <br />
          {informacionDeLaAgencia.TelefonoRepresentanteVentas && (
            <>Tel. {informacionDeLaAgencia.TelefonoRepresentanteVentas}</>
          )}
        </small>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>Teléfono Agencia</b> {informacionDeLaAgencia.TelefonoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>Correo(s)</b> {informacionDeLaAgencia.CorreoAgencia}
          {informacionDeLaAgencia.CorreoAgenciaSecundario && (
            <>
              <br />
              {informacionDeLaAgencia.CorreoAgenciaSecundario}
            </>
          )}
        </small>
        <small className="ModalInformacionDeLaAgenciaProductos__Contenido--Informacion Col2">
          <ion-icon name="location"></ion-icon>
          <b>Locación</b>
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
            Asignar
          </button>
        )}
      </article>
    </div>
  );
}
