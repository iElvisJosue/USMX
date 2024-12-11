// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_PEDIDOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RealizarPedido from "../componentes/Pedidos/RealizarPedido/RealizarPedido";
import ListaPedidos from "../componentes/Pedidos/ListaPedidos/ListaPedidos";

export default function Ocurres() {
  const { idioma } = useConfiguracion();
  const [vistaOcurres, establecerVistaOcurres] = useState(0);

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_PEDIDOS[idioma].RealizarPedido,
      Icono: "cube",
    },
    {
      Texto: DICCIONARIO_PEDIDOS[idioma].ListaDePedidos,
      Icono: "list",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RealizarPedido,
    1: ListaPedidos,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_PEDIDOS[idioma].RealizarPedido,
    1: DICCIONARIO_PEDIDOS[idioma].ListaDePedidos,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOcurres];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion={DICCIONARIO_PEDIDOS[idioma].Paqueteria}
        subseccion={TituloSubseccion[vistaOcurres]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaOcurres}
        establecerVista={establecerVistaOcurres}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
