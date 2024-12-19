/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import InputBuscarEnTabla from "../../Globales/InputBuscarEnTabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_RECOLECCION,
  DICCIONARIO_RESULTADOS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import ObtenerPedidosDeUnaRecoleccion from "../../../hooks/Recolecciones/useObtenerPedidosDeUnaRecoleccion";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Recolecciones/ListaRecolecciones/DetallesRecoleccion.css";

export default function DetallesRecoleccion({
  Idioma,
  informacionDeLaRecoleccion,
  establecerVista,
  esCompleta,
}) {
  const [arrayDePedidos, establecerArrayDePedidos] = useState([]);
  const { pedidos, cargando } = ObtenerPedidosDeUnaRecoleccion(
    informacionDeLaRecoleccion.idRecoleccion
  );
  useEffect(() => {
    if (pedidos.length > 0) establecerArrayDePedidos(pedidos);
  }, [pedidos]);

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
        <h1>{DICCIONARIO_DETALLES_RECOLECCION[Idioma].Detalles}</h1>
      </section>
      <div className="DetallesRecoleccion__Detalles Recoleccion">
        <ion-icon name="folder"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[Idioma].IDRecoleccion}</b>
        {informacionDeLaRecoleccion.idRecoleccion}
      </div>
      <div className="DetallesRecoleccion__Detalles">
        <ion-icon name="apps"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[Idioma].CantidadDeGuias}</b>
        {pedidos.length}
      </div>
      <div className="DetallesRecoleccion__Detalles">
        <ion-icon name="person-circle"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[Idioma].Usuario}</b>{" "}
        {informacionDeLaRecoleccion.Usuario}
      </div>
      <div className="DetallesRecoleccion__Detalles">
        <ion-icon name="calendar"></ion-icon>{" "}
        <b>{DICCIONARIO_DETALLES_RECOLECCION[Idioma].FechaDeCreacion}</b>{" "}
        {FormatearFecha(
          informacionDeLaRecoleccion.FechaCreacionRecoleccion.slice(0, 10)
        )}{" "}
        {informacionDeLaRecoleccion.HoraCreacionRecoleccion}
      </div>
      <section className="DetallesRecoleccion__Seccion">
        <img src="ListaDeGuias.png" alt="Logo Lista De Guias" />
        <h1>{DICCIONARIO_DETALLES_RECOLECCION[Idioma].ListaDeGuias}</h1>
      </section>
      <InputBuscarEnTabla
        Idioma={Idioma}
        FuncionDeEstablecimiento={establecerArrayDePedidos}
        ArrayDeBusqueda={pedidos}
      />
      {arrayDePedidos.length > 0 ? (
        <div className="DetallesRecoleccion__Cuerpo" key={pedidos.length}>
          <table className="DetallesRecoleccion__Cuerpo--Tabla">
            <thead className="DetallesRecoleccion__Cuerpo--Tabla--Encabezado">
              <tr>
                <th>#</th>
                <th>
                  <ion-icon name="bag-check"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_RECOLECCION[Idioma].Guia}
                </th>
                <th>
                  <ion-icon name="document-text"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_RECOLECCION[Idioma].Contenido}
                </th>
                <th>
                  <ion-icon name="expand"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_RECOLECCION[Idioma].Medidas}
                </th>
                <th>
                  <ion-icon name="scale"></ion-icon>
                  <br />
                  {DICCIONARIO_DETALLES_RECOLECCION[Idioma].Peso}
                </th>
              </tr>
            </thead>
            <tbody className="DetallesRecoleccion__Cuerpo--Tabla__Cuerpo">
              {arrayDePedidos.map((pedido, index) => (
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
      ) : (
        <MensajeGeneral
          Imagen="SinResultados.png"
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
