/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";
import InputBuscarEnTabla from "../../../InputBuscarEnTabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_MOVIMIENTO,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPedidosDeUnMovimiento from "../../../../hooks/Bodega/Movimientos/useObtenerPedidosDeUnMovimiento";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/ListaDeMovimientosEnBodega/DetallesMovimientoEnBodega.css";

export default function DetallesMovimientoEnBodega({
  idioma,
  informacionDelMovimiento,
  establecerVista,
  esCompleta,
}) {
  const [arrayDePedidos, establecerArrayDePedidos] = useState([]);
  const { pedidos, cargando } = useObtenerPedidosDeUnMovimiento(
    informacionDelMovimiento.idMovimientoBodega
  );

  useEffect(() => {
    if (pedidos.length > 0) establecerArrayDePedidos(pedidos);
  }, [pedidos]);

  if (cargando) return <Cargando />;

  return (
    <div className="DetallesMovimientoEnBodega">
      <section className="DetallesMovimientoEnBodega__Opciones">
        <button
          className="DetallesMovimientoEnBodega__Opciones--Boton"
          onClick={() => (esCompleta ? establecerVista(0) : establecerVista(1))}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <section className="DetallesMovimientoEnBodega__Seccion">
        <img src="LogoDetalles.png" alt="Logo Detalles" />
        <h1>{DICCIONARIO_DETALLES_MOVIMIENTO[idioma].Detalles}</h1>
      </section>
      <div className="DetallesMovimientoEnBodega__Detalles MovimientosB">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_MOVIMIENTO[idioma].idMovimientoBodega}</b>
        {informacionDelMovimiento.idMovimientoBodega}
      </div>
      <div className="DetallesMovimientoEnBodega__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_MOVIMIENTO[idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesMovimientoEnBodega__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_MOVIMIENTO[idioma].Usuario}</b>{" "}
        {informacionDelMovimiento.Usuario}
      </div>
      <div className="DetallesMovimientoEnBodega__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_MOVIMIENTO[idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(
          informacionDelMovimiento.FechaCreacionMovimientoBodega.slice(0, 10)
        )}{" "}
        {informacionDelMovimiento.HoraCreacionMovimientoBodega}
      </div>
      <section className="DetallesMovimientoEnBodega__Seccion">
        <img src="ListaDeGuias.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_MOVIMIENTO[idioma].ListaDeGuias}</h1>
      </section>
      <InputBuscarEnTabla
        idioma={idioma}
        FuncionDeEstablecimiento={establecerArrayDePedidos}
        ArrayDeBusqueda={pedidos}
      />
      {arrayDePedidos.length > 0 ? (
        <div
          className="DetallesMovimientoEnBodega__Cuerpo"
          key={pedidos.length}
        >
          <table className="DetallesMovimientoEnBodega__Cuerpo--Tabla">
            <thead className="DetallesMovimientoEnBodega__Cuerpo--Tabla--Encabezado">
              <tr>
                <th>#</th>
                <th>
                  <ion-icon name="bag-check"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_MOVIMIENTO[idioma].Guia}
                </th>
                <th>
                  <ion-icon name="document-text"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_MOVIMIENTO[idioma].Contenido}
                </th>
                <th>
                  <ion-icon name="expand"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_MOVIMIENTO[idioma].Medidas}
                </th>
                <th>
                  <ion-icon name="scale"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_MOVIMIENTO[idioma].Peso}
                </th>
              </tr>
            </thead>
            <tbody className="DetallesMovimientoEnBodega__Cuerpo--Tabla__Cuerpo">
              {arrayDePedidos.map((pedido, index) => (
                <tr
                  key={pedido.idPedido}
                  className={
                    "DetallesMovimientoEnBodega__Cuerpo--Tabla__Cuerpo--TR"
                  }
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
      ) : (
        <MensajeGeneral
          Imagen="SinResultados.png"
          Texto={DICCIONARIO_RESULTADOS[idioma].NoResultados}
        />
      )}
    </div>
  );
}
