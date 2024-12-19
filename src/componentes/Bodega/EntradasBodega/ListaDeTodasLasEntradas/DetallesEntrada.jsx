/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";
import InputBuscarEnTabla from "../../../Globales/InputBuscarEnTabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_ENTRADA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPedidosDeUnaEntrada from "../../../../hooks/Bodega/Entradas/useObtenerPedidosDeUnaEntrada";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/EntradasBodega/ListaDeTodasLasEntradas/DetallesEntrada.css";

export default function DetallesEntrada({
  Idioma,
  informacionDeLaEntrada,
  establecerVista,
  esCompleta,
}) {
  const [arrayDePedidos, establecerArrayDePedidos] = useState([]);
  const { pedidos, cargando } = useObtenerPedidosDeUnaEntrada(
    informacionDeLaEntrada.idEntradaBodega
  );

  useEffect(() => {
    if (pedidos.length > 0) establecerArrayDePedidos(pedidos);
  }, [pedidos]);

  if (cargando) return <Cargando />;

  return (
    <div className="DetallesEntrada">
      <section className="DetallesEntrada__Opciones">
        <button
          className="DetallesEntrada__Opciones--Boton"
          onClick={() => establecerVista(esCompleta ? 0 : 1)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <section className="DetallesEntrada__Seccion">
        <img src="LogoDetalles.png" alt="Logo Detalles" />
        <h1>{DICCIONARIO_DETALLES_ENTRADA[Idioma].Detalles}</h1>
      </section>
      <div className="DetallesEntrada__Detalles Entrada">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].idEntradaBodega}</b>
        {informacionDeLaEntrada.idEntradaBodega}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].Usuario}</b>{" "}
        {informacionDeLaEntrada.Usuario}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(
          informacionDeLaEntrada.FechaCreacionEntrada.slice(0, 10)
        )}{" "}
        {informacionDeLaEntrada.HoraCreacionEntrada}
      </div>
      <div className="DetallesEntrada__Detalles Completo">
        <ion-icon name="person"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].NombreTransportista}</b>
        {pedidos[0].NombreTransportista}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="build"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].Remolque}</b>
        {pedidos[0].Remolque}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="build"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].Tracto}</b> {pedidos[0].Tracto}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="lock-closed"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].Candado}</b>{" "}
        {pedidos[0].Candado}
      </div>
      <div className="DetallesEntrada__Detalles">
        <ion-icon name="time"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_ENTRADA[Idioma].HoraDeEntrada}</b>{" "}
        {pedidos[0].HoraEntrada}
      </div>
      <section className="DetallesEntrada__Seccion">
        <img src="ListaDeGuias.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_ENTRADA[Idioma].ListaDeGuias}</h1>
      </section>
      <InputBuscarEnTabla
        Idioma={Idioma}
        FuncionDeEstablecimiento={establecerArrayDePedidos}
        ArrayDeBusqueda={pedidos}
      />
      {arrayDePedidos.length > 0 ? (
        <div className="DetallesEntrada__Cuerpo" key={pedidos.length}>
          <table className="DetallesEntrada__Cuerpo--Tabla">
            <thead className="DetallesEntrada__Cuerpo--Tabla--Encabezado">
              <tr>
                <th>#</th>
                <th>
                  <ion-icon name="bag-check"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_ENTRADA[Idioma].Guia}
                </th>
                <th>
                  <ion-icon name="document-text"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_ENTRADA[Idioma].Contenido}
                </th>
                <th>
                  <ion-icon name="expand"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_ENTRADA[Idioma].Medidas}
                </th>
                <th>
                  <ion-icon name="scale"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_ENTRADA[Idioma].Peso}
                </th>
              </tr>
            </thead>
            <tbody className="DetallesEntrada__Cuerpo--Tabla__Cuerpo">
              {arrayDePedidos.map((pedido, index) => (
                <tr
                  key={pedido.idPedido}
                  className={"DetallesEntrada__Cuerpo--Tabla__Cuerpo--TR"}
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
