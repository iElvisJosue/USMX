// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

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
  const { idioma } = useConfiguracion();

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_BODEGA_DEVOLUCIONES[idioma].CrearDevolucion,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_BODEGA_DEVOLUCIONES[idioma].ListaDeDevoluciones,
      Icono: "list",
    },
  ];

  //   VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearDevolucion,
    1: ListaDevoluciones,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_BODEGA_DEVOLUCIONES[idioma].CrearDevolucion,
    1: DICCIONARIO_BODEGA_DEVOLUCIONES[idioma].ListaDeDevoluciones,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaBodega];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="cube"
        seccion={DICCIONARIO_BODEGA_DEVOLUCIONES[idioma].Bodega}
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
