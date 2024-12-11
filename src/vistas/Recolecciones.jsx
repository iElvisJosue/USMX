// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_RECOLECCIONES } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import CrearRecoleccion from "../componentes/Recolecciones/CrearRecoleccion/CrearRecoleccion";
import ListaRecolecciones from "../componentes/Recolecciones/ListaRecolecciones/ListaRecolecciones";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/generales/GrupoDeInputs.css";

export default function Recolecciones() {
  const [vistaRecoleccion, establecerVistaRecoleccion] = useState(0);
  const { idioma } = useConfiguracion();

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_RECOLECCIONES[idioma].CrearRecoleccion,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_RECOLECCIONES[idioma].ListaDeRecolecciones,
      Icono: "list",
    },
  ];

  //   VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearRecoleccion,
    1: ListaRecolecciones,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_RECOLECCIONES[idioma].CrearRecoleccion,
    1: DICCIONARIO_RECOLECCIONES[idioma].ListaDeRecolecciones,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaRecoleccion];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="bag-check"
        seccion={DICCIONARIO_RECOLECCIONES[idioma].Recolecciones}
        subseccion={TituloSubseccion[vistaRecoleccion]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaRecoleccion}
        establecerVista={establecerVistaRecoleccion}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
