/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFecha from "../../../hooks/useBuscarPedidosPorFecha";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_PEDIDOS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/ListaPedidos/ListaPedidosPorFecha.css";

export default function ListaPedidosPorFecha({
  Idioma,
  EstablecerLosDetallesDelPedido,
}) {
  const {
    pedidosPorFecha,
    cargandoPedidosPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarPedidosPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoPedidosPorFecha) return <Cargando />;

  return (
    <div className="ListaPedidosPorFecha">
      <h1 className="ListaPedidosPorFecha__Titulo">
        {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].BuscarPedidosPorFecha}
        <small className="ListaPedidosPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaPedidosPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaPedidosPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaPedidosPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {pedidosPorFecha.length > 0 ? (
        <>
          <small className="ListaPedidosPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {pedidosPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="ListaPedidosPorFecha__Cuerpo">
            <table className="ListaPedidosPorFecha__Cuerpo__Tabla">
              <thead className="ListaPedidosPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Guia}
                  </th>
                  <th>
                    <ion-icon name="paper-plane"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Remitente}
                  </th>
                  <th>
                    <ion-icon name="location"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Destinatario}
                  </th>
                  <th>
                    <ion-icon name="business"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Agencia}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].FechaCreacion}
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaPedidosPorFecha__Cuerpo__Tabla__Cuerpo">
                {pedidosPorFecha.map((pedido) => (
                  <tr key={pedido.idPedido}>
                    <td>{pedido.GuiaPedido}</td>
                    <td>
                      {pedido.NombreRemitente} {pedido.ApellidosRemitente}
                    </td>
                    <td>
                      {pedido.NombreDestinatario} {pedido.ApellidosDestinatario}
                    </td>
                    <td>{pedido.NombreAgencia}</td>
                    <td>{pedido.Usuario}</td>
                    <td>
                      {FormatearFecha(pedido.FechaCreacionPedido.slice(0, 10))}{" "}
                      {pedido.HoraCreacionPedido}
                    </td>
                    <td>
                      <button
                        className="ListaPedidosPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() => EstablecerLosDetallesDelPedido(pedido)}
                      >
                        {DICCIONARIO_BOTONES[Idioma].Ver}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`${
            DICCIONARIO_RESULTADOS[Idioma].NoResultadoPorFecha
          } ${primeraFecha.split("-").reverse().join("/")} - ${segundaFecha
            .split("-")
            .reverse()
            .join("/")}.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Pedidos"}
          TextoBoton={
            DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].RealizarPedido
          }
        />
      )}
    </div>
  );
}
