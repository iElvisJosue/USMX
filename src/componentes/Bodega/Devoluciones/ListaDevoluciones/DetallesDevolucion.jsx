/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_DETALLES_DEVOLUCION } from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPedidosDeUnaDevolucion from "../../../../hooks/Bodega/Devoluciones/useObtenerPedidosDeUnaDevolucion";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/Devoluciones/ListaDevoluciones/DetallesDevolucion.css";

export default function DetallesDevolucion({
  idioma,
  informacionDeLaDevolucion,
  establecerVista,
  esCompleta,
}) {
  const { pedidos, cargando } = useObtenerPedidosDeUnaDevolucion(
    informacionDeLaDevolucion.idDevolucion
  );
  if (cargando) return <Cargando />;

  return (
    <div className="DetallesDevolucion">
      <section className="DetallesDevolucion__Opciones">
        <button
          className="DetallesDevolucion__Opciones--Boton"
          onClick={() => (esCompleta ? establecerVista(0) : establecerVista(1))}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <section className="DetallesDevolucion__Seccion">
        <img src="LogoDetallesDevolucion.png" alt="Logo Detalles" />
        <h1>{DICCIONARIO_DETALLES_DEVOLUCION[idioma].Detalles}</h1>
      </section>
      <div className="DetallesDevolucion__Detalles Devolucion">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[idioma].idDevolucion}</b>
        {informacionDeLaDevolucion.idDevolucion}
      </div>
      <div className="DetallesDevolucion__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesDevolucion__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[idioma].Usuario}</b>{" "}
        {informacionDeLaDevolucion.Usuario}
      </div>
      <div className="DetallesDevolucion__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(
          informacionDeLaDevolucion.FechaCreacionDevolucion.slice(0, 10)
        )}{" "}
        {informacionDeLaDevolucion.HoraCreacionDevolucion}
      </div>
      <section className="DetallesDevolucion__Seccion">
        <img src="ListaDeGuiasDevoluciones.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_DEVOLUCION[idioma].ListaDeGuias}</h1>
      </section>
      <div className="DetallesDevolucion__Cuerpo" key={pedidos.length}>
        <table className="DetallesDevolucion__Cuerpo--Tabla">
          <thead className="DetallesDevolucion__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>#</th>
              <th>
                <ion-icon name="bag-check"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_DEVOLUCION[idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_DEVOLUCION[idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_DEVOLUCION[idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_DEVOLUCION[idioma].Peso}
              </th>
            </tr>
          </thead>
          <tbody className="DetallesDevolucion__Cuerpo--Tabla__Cuerpo">
            {pedidos.map((pedido, index) => (
              <tr
                key={pedido.idPedido}
                className={"DetallesDevolucion__Cuerpo--Tabla__Cuerpo--TR"}
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
