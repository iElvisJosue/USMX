/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_DETALLES_RECOLECCION } from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import ObtenerPedidosDeUnaRecoleccion from "../../../hooks/Recolecciones/useObtenerPedidosDeUnaRecoleccion";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Recolecciones/ListaRecolecciones/DetallesRecoleccion.css";

export default function DetallesRecoleccion({
  idioma,
  informacionDeLaRecoleccion,
  establecerVista,
  esCompleta,
}) {
  const { pedidos, cargando } = ObtenerPedidosDeUnaRecoleccion(
    informacionDeLaRecoleccion.idRecoleccion
  );
  if (cargando) return <Cargando />;

  return (
    <div className="DetallesRecoleccion">
      <section className="DetallesRecoleccion__Opciones">
        <button
          className="DetallesRecoleccion__Opciones--Boton"
          onClick={() => (esCompleta ? establecerVista(0) : establecerVista(1))}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <section className="DetallesRecoleccion__Seccion">
        <img src="LogoDetalles.png" alt="Logo Detalles" />
        <h1>{DICCIONARIO_DETALLES_RECOLECCION[idioma].Detalles}</h1>
      </section>
      <div className="DetallesRecoleccion__Detalles Recoleccion">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[idioma].IDRecoleccion}</b>
        {informacionDeLaRecoleccion.idRecoleccion}
      </div>
      <div className="DetallesRecoleccion__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesRecoleccion__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[idioma].Usuario}</b>{" "}
        {informacionDeLaRecoleccion.Usuario}
      </div>
      <div className="DetallesRecoleccion__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(
          informacionDeLaRecoleccion.FechaCreacionRecoleccion.slice(0, 10)
        )}{" "}
        {informacionDeLaRecoleccion.HoraCreacionRecoleccion}
      </div>
      <section className="DetallesRecoleccion__Seccion">
        <img src="ListaDeGuias.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_RECOLECCION[idioma].ListaDeGuias}</h1>
      </section>
      <div className="DetallesRecoleccion__Cuerpo" key={pedidos.length}>
        <table className="DetallesRecoleccion__Cuerpo--Tabla">
          <thead className="DetallesRecoleccion__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>#</th>
              <th>
                <ion-icon name="bag-check"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_RECOLECCION[idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_RECOLECCION[idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_RECOLECCION[idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_RECOLECCION[idioma].Peso}
              </th>
            </tr>
          </thead>
          <tbody className="DetallesRecoleccion__Cuerpo--Tabla__Cuerpo">
            {pedidos.map((pedido, index) => (
              <tr
                key={pedido.idPedido}
                className={"DetallesRecoleccion__Cuerpo--Tabla__Cuerpo--TR"}
              >
                <td>{index + 1}</td>
                <td>{pedido.GuiaPedido}</td>
                <td>{pedido.ContenidoPedido}</td>
                <td>
                  Alto: {pedido.AltoPedido}
                  <br />
                  Ancho: {pedido.AnchoPedido}
                  <br />
                  Largo: {pedido.LargoPedido}
                </td>
                <td>{pedido.PesoPedido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
