/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFecha from "../../../hooks/useBuscarPedidosPorFecha";

// COMPONENTES A USAR
import Tabla from "../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_PEDIDOS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
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

  const FormatearFechaDeLosPedidos = () => {
    pedidosPorFecha.map(
      (pedido) =>
        (pedido.FechaCreacionPedido = FormatearFecha(
          pedido.FechaCreacionPedido.slice(0, 10)
        ))
    );
    return pedidosPorFecha;
  };

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
          <Tabla
            ContenidoTabla={FormatearFechaDeLosPedidos()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto: DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Guia,
              },
              {
                Icono: "paper-plane",
                Texto: DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Remitente,
              },
              {
                Icono: "location",
                Texto: DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Destinatario,
              },
              {
                Icono: "business",
                Texto: DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Agencia,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_PEDIDOS_POR_FECHA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "GuiaPedido",
              },
              {
                TextoUno: "NombreRemitente",
                TextoDos: "ApellidosRemitente",
              },
              {
                TextoUno: "NombreDestinatario",
                TextoDos: "ApellidosDestinatario",
              },
              {
                TextoUno: "NombreAgencia",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionPedido",
                TextoDos: "HoraCreacionPedido",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDelPedido,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: false,
                  },
                ],
              },
            ]}
          />
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
        />
      )}
    </div>
  );
}
