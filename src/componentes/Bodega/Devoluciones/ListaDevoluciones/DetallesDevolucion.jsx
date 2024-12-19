/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";
import InputBuscarEnTabla from "../../../Globales/InputBuscarEnTabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_DEVOLUCION,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPedidosDeUnaDevolucion from "../../../../hooks/Bodega/Devoluciones/useObtenerPedidosDeUnaDevolucion";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/Devoluciones/ListaDevoluciones/DetallesDevolucion.css";

export default function DetallesDevolucion({
  Idioma,
  informacionDeLaDevolucion,
  establecerVista,
  esCompleta,
}) {
  const [arrayDePedidos, establecerArrayDePedidos] = useState([]);
  const { pedidos, cargando } = useObtenerPedidosDeUnaDevolucion(
    informacionDeLaDevolucion.idDevolucion
  );

  useEffect(() => {
    if (pedidos.length > 0) establecerArrayDePedidos(pedidos);
  }, [pedidos]);

  if (cargando) return <Cargando />;

  return (
    <div className="DetallesDevolucion">
      <section className="DetallesDevolucion__Opciones">
        <button
          className="DetallesDevolucion__Opciones--Boton"
          onClick={() => establecerVista(esCompleta ? 0 : 1)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <section className="DetallesDevolucion__Seccion">
        <img src="LogoDetallesDevolucion.png" alt="Logo Detalles" />
        <h1>{DICCIONARIO_DETALLES_DEVOLUCION[Idioma].Detalles}</h1>
      </section>
      <div className="DetallesDevolucion__Detalles Devolucion">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[Idioma].idDevolucion}</b>
        {informacionDeLaDevolucion.idDevolucion}
      </div>
      <div className="DetallesDevolucion__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[Idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesDevolucion__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[Idioma].Usuario}</b>{" "}
        {informacionDeLaDevolucion.Usuario}
      </div>
      <div className="DetallesDevolucion__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_DEVOLUCION[Idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(
          informacionDeLaDevolucion.FechaCreacionDevolucion.slice(0, 10)
        )}{" "}
        {informacionDeLaDevolucion.HoraCreacionDevolucion}
      </div>
      <section className="DetallesDevolucion__Seccion">
        <img src="ListaDeGuiasDevoluciones.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_DEVOLUCION[Idioma].ListaDeGuias}</h1>
      </section>
      <InputBuscarEnTabla
        Idioma={Idioma}
        FuncionDeEstablecimiento={establecerArrayDePedidos}
        ArrayDeBusqueda={pedidos}
      />
      {arrayDePedidos.length > 0 ? (
        <div className="DetallesDevolucion__Cuerpo" key={pedidos.length}>
          <table className="DetallesDevolucion__Cuerpo--Tabla">
            <thead className="DetallesDevolucion__Cuerpo--Tabla--Encabezado">
              <tr>
                <th>#</th>
                <th>
                  <ion-icon name="bag-check"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_DEVOLUCION[Idioma].Guia}
                </th>
                <th>
                  <ion-icon name="document-text"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_DEVOLUCION[Idioma].Contenido}
                </th>
                <th>
                  <ion-icon name="expand"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_DEVOLUCION[Idioma].Medidas}
                </th>
                <th>
                  <ion-icon name="scale"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_DEVOLUCION[Idioma].Peso}
                </th>
              </tr>
            </thead>
            <tbody className="DetallesDevolucion__Cuerpo--Tabla__Cuerpo">
              {arrayDePedidos.map((pedido, index) => (
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
      ) : (
        <MensajeGeneral
          Imagen="SinResultados.png"
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
