// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDePedidos from "../componentes/Pedidos/ListaDePedidos";
import DetallesDelPedido from "../componentes/Pedidos/DetallesDelPedido";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFiltroYTipoDeUsuario from "../hooks/useBuscarPedidosPorFiltroYTipoDeUsuario";

// IMPORTAMOS LAS AYUDAS
// import {  } from "../helpers/RegistrarProductos/ListaDeProgreso";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Pedidos.css";

export default function Pedidos() {
  const [vista, establecerVista] = useState(0);
  const [detallesPedido, establecerDetallesPedido] = useState(null);
  const { pedidos, cargando, filtro, establecerFiltro } =
    useBuscarPedidosPorFiltroYTipoDeUsuario();

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    pedidos,
    cargando,
    filtro,
    establecerFiltro,
    establecerVista,
    detallesPedido,
    establecerDetallesPedido,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDePedidos,
    1: DetallesDelPedido,
  };

  const TituloSeccion = vista === 0 ? "Paquetería" : "Paquetería / Pedidos";
  const TituloSubsección = vista === 0 ? "Pedidos" : "Detalles del pedido";

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion={TituloSeccion}
        subseccion={TituloSubsección}
      />
      <div className="Pedidos">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
