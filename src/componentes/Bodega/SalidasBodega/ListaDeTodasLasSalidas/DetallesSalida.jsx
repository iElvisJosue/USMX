/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_DETALLES_SALIDA } from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPedidosDeUnaSalida from "../../../../hooks/Bodega/Salidas/useObtenerPedidosDeUnaSalida";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/DetallesSalida.css";

export default function DetallesSalida({
  idioma,
  informacionSalida,
  establecerVista,
  esCompleta,
}) {
  const { pedidos, cargando } = useObtenerPedidosDeUnaSalida(
    informacionSalida.idSalidaBodega
  );
  if (cargando) return <Cargando />;

  return (
    <div className="DetallesSalida">
      <section className="DetallesSalida__Opciones">
        <button
          className="DetallesSalida__Opciones--Boton"
          onClick={() => (esCompleta ? establecerVista(0) : establecerVista(1))}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <section className="DetallesSalida__Seccion">
        <img src="LogoDetalles.png" alt="Logo Detalles" />
        <h1>{DICCIONARIO_DETALLES_SALIDA[idioma].Detalles}</h1>
      </section>
      <div className="DetallesSalida__Detalles Salida">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].idSalidaBodega}</b>
        {informacionSalida.idSalidaBodega}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].Usuario}</b>{" "}
        {informacionSalida.Usuario}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(informacionSalida.FechaCreacionSalida.slice(0, 10))}{" "}
        {informacionSalida.HoraCreacionSalida}
      </div>
      <div className="DetallesSalida__Detalles Completo">
        <ion-icon name="person"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].NombreTransportista}</b>
        {pedidos[0].NombreTransportista}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="build"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].Remolque}</b>
        {pedidos[0].Remolque}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="build"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].Tracto}</b> {pedidos[0].Tracto}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="lock-closed"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].Candado}</b>{" "}
        {pedidos[0].Candado}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="time"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[idioma].HoraDeSalida}</b>{" "}
        {pedidos[0].HoraSalida}
      </div>
      <section className="DetallesSalida__Seccion">
        <img src="ListaDeGuias.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_SALIDA[idioma].ListaDeGuias}</h1>
      </section>
      <div className="DetallesSalida__Cuerpo" key={pedidos.length}>
        <table className="DetallesSalida__Cuerpo--Tabla">
          <thead className="DetallesSalida__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>#</th>
              <th>
                <ion-icon name="bag-check"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_SALIDA[idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_SALIDA[idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_SALIDA[idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_DETALLES_SALIDA[idioma].Peso}
              </th>
            </tr>
          </thead>
          <tbody className="DetallesSalida__Cuerpo--Tabla__Cuerpo">
            {pedidos.map((pedido, index) => (
              <tr
                key={pedido.idPedido}
                className={"DetallesSalida__Cuerpo--Tabla__Cuerpo--TR"}
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
