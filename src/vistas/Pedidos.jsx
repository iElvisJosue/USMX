// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_PEDIDOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import SubMenu from "../componentes/Globales/SubMenu";
import RealizarPedido from "../componentes/Pedidos/RealizarPedido/RealizarPedido";
import ListaPedidos from "../componentes/Pedidos/ListaPedidos/ListaPedidos";

export default function Ocurres() {
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaOcurres, establecerVistaOcurres] = useState(0);

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_PEDIDOS[Idioma].RealizarPedido,
      Icono: "cube",
    },
    {
      Texto: DICCIONARIO_PEDIDOS[Idioma].ListaDePedidos,
      Icono: "list",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RealizarPedido,
    1: ListaPedidos,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_PEDIDOS[Idioma].RealizarPedido,
    1: DICCIONARIO_PEDIDOS[Idioma].ListaDePedidos,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOcurres];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion={DICCIONARIO_PEDIDOS[Idioma].Paqueteria}
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
