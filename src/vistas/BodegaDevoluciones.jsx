// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_BODEGA_DEVOLUCIONES } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import CrearDevolucion from "../componentes/Bodega/Devoluciones/CrearDevolucion/CrearDevolucion";
import ListaDevoluciones from "../componentes/Bodega/Devoluciones/ListaDevoluciones/ListaDevoluciones";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/generales/GrupoDeInputs.css";

export default function BodegaDevoluciones() {
  const [vistaBodega, establecerVistaBodega] = useState(0);
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_BODEGA_DEVOLUCIONES[Idioma].CrearDevolucion,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_BODEGA_DEVOLUCIONES[Idioma].ListaDeDevoluciones,
      Icono: "list",
    },
  ];

  //   VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearDevolucion,
    1: ListaDevoluciones,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_BODEGA_DEVOLUCIONES[Idioma].CrearDevolucion,
    1: DICCIONARIO_BODEGA_DEVOLUCIONES[Idioma].ListaDeDevoluciones,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaBodega];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="cube"
        seccion={DICCIONARIO_BODEGA_DEVOLUCIONES[Idioma].Bodega}
        subseccion={TituloSubseccion[vistaBodega]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaBodega}
        establecerVista={establecerVistaBodega}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
