/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaPedidosCompleta from "./ListaPedidosCompleta";
import ListaPedidosPorFecha from "./ListaPedidosPorFecha";
import DetallesPedido from "./DetallesPedido";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Pedidos/ListaPedidos/ListaPedidos.css";

export default function ListaPedidos({ Idioma }) {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [detallesPedido, establecerDetallesPedido] = useState(null);

  const EstablecerLosDetallesDelPedido = (Pedido, esCompleta) => {
    establecerDetallesPedido(Pedido);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
    esCompleta,
    establecerVista,
    detallesPedido,
    establecerDetallesPedido,
    EstablecerLosDetallesDelPedido,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaPedidosCompleta,
    1: ListaPedidosPorFecha,
    2: DetallesPedido,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaPedidos">
      {vista < 2 && (
        <span className="ListaPedidos__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaPedidos__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaPedidos__Opciones--Boton ListaCompleta"
              onClick={() => establecerVista(0)}
            >
              <ion-icon name="list"></ion-icon>
            </button>
          )}
        </span>
      )}
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
