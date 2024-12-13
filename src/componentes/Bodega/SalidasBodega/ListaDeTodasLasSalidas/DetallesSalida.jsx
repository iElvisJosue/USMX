/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";
import InputBuscarEnTabla from "../../../InputBuscarEnTabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_SALIDA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPedidosDeUnaSalida from "../../../../hooks/Bodega/Salidas/useObtenerPedidosDeUnaSalida";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/DetallesSalida.css";

export default function DetallesSalida({
  Idioma,
  informacionSalida,
  establecerVista,
  esCompleta,
}) {
  const [arrayDePedidos, establecerArrayDePedidos] = useState([]);
  const { pedidos, cargando } = useObtenerPedidosDeUnaSalida(
    informacionSalida.idSalidaBodega
  );

  useEffect(() => {
    if (pedidos.length > 0) establecerArrayDePedidos(pedidos);
  }, [pedidos]);

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
        <h1>{DICCIONARIO_DETALLES_SALIDA[Idioma].Detalles}</h1>
      </section>
      <div className="DetallesSalida__Detalles Salida">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].idSalidaBodega}</b>
        {informacionSalida.idSalidaBodega}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].Usuario}</b>{" "}
        {informacionSalida.Usuario}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(informacionSalida.FechaCreacionSalida.slice(0, 10))}{" "}
        {informacionSalida.HoraCreacionSalida}
      </div>
      <div className="DetallesSalida__Detalles Completo">
        <ion-icon name="person"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].NombreTransportista}</b>
        {pedidos[0].NombreTransportista}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="build"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].Remolque}</b>
        {pedidos[0].Remolque}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="build"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].Tracto}</b> {pedidos[0].Tracto}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="lock-closed"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].Candado}</b>{" "}
        {pedidos[0].Candado}
      </div>
      <div className="DetallesSalida__Detalles">
        <ion-icon name="time"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_SALIDA[Idioma].HoraDeSalida}</b>{" "}
        {pedidos[0].HoraSalida}
      </div>
      <section className="DetallesSalida__Seccion">
        <img src="ListaDeGuias.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_SALIDA[Idioma].ListaDeGuias}</h1>
      </section>
      <InputBuscarEnTabla
        Idioma={Idioma}
        FuncionDeEstablecimiento={establecerArrayDePedidos}
        ArrayDeBusqueda={pedidos}
      />
      {arrayDePedidos.length > 0 ? (
        <div className="DetallesSalida__Cuerpo" key={pedidos.length}>
          <table className="DetallesSalida__Cuerpo--Tabla">
            <thead className="DetallesSalida__Cuerpo--Tabla--Encabezado">
              <tr>
                <th>#</th>
                <th>
                  <ion-icon name="bag-check"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_SALIDA[Idioma].Guia}
                </th>
                <th>
                  <ion-icon name="document-text"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_SALIDA[Idioma].Contenido}
                </th>
                <th>
                  <ion-icon name="expand"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_SALIDA[Idioma].Medidas}
                </th>
                <th>
                  <ion-icon name="scale"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_SALIDA[Idioma].Peso}
                </th>
              </tr>
            </thead>
            <tbody className="DetallesSalida__Cuerpo--Tabla__Cuerpo">
              {arrayDePedidos.map((pedido, index) => (
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
      ) : (
        <MensajeGeneral
          Imagen="SinResultados.png"
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
