/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFiltro from "../../../hooks/useBuscarPedidosPorFiltro";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_PEDIDOS_COMPLETA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/ListaPedidos/ListaPedidosCompleta.css";

export default function ListaDePedidosCompleta({
  Idioma,
  EstablecerLosDetallesDelPedido,
}) {
  const { pedidos, cargando, filtro, establecerFiltro } =
    useBuscarPedidosPorFiltro();

  const BuscarPedidos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaPedidosCompleta">
      <h1 className="ListaPedidosCompleta__Titulo">
        {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].ListaCompletaDePedidos}
      </h1>
      <span className="ListaPedidosCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].BuscarPedido}
          onChange={BuscarPedidos}
        />
        <span className="ListaPedidosCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {pedidos.length > 0 ? (
        <>
          <small className="ListaPedidosCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {pedidos.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="ListaPedidosCompleta__Cuerpo">
            <table className="ListaPedidosCompleta__Cuerpo__Tabla">
              <thead className="ListaPedidosCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Guia}
                  </th>
                  <th>
                    <ion-icon name="paper-plane"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Remitente}
                  </th>
                  <th>
                    <ion-icon name="location"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Destinatario}
                  </th>
                  <th>
                    <ion-icon name="business"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Agencia}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].FechaCreacion}
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaPedidosCompleta__Cuerpo__Tabla__Cuerpo">
                {pedidos.map((pedido) => (
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
                        className="ListaPedidosCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
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
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Pedidos"}
          TextoBoton={DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].RealizarPedido}
        />
      )}
    </div>
  );
}
