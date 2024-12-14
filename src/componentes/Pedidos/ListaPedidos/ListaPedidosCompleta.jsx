/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFiltro from "../../../hooks/useBuscarPedidosPorFiltro";

// COMPONENTES A USAR
import Tabla from "../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_PEDIDOS_COMPLETA,
  DICCIONARIO_RESULTADOS,
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

  const FormatearFechaDeLosPedidos = () => {
    pedidos.map(
      (pedido) =>
        (pedido.FechaCreacionPedido = FormatearFecha(
          pedido.FechaCreacionPedido.slice(0, 10)
        ))
    );
    return pedidos;
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
          <Tabla
            ContenidoTabla={FormatearFechaDeLosPedidos()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Guia,
              },
              {
                Icono: "paper-plane",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Remitente,
              },
              {
                Icono: "location",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Destinatario,
              },
              {
                Icono: "business",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Agencia,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_PEDIDOS_COMPLETA[Idioma].Acciones,
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
                    Completa: true,
                  },
                ],
              },
            ]}
          />
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
