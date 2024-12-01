// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_BODEGA_SALIDAS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import CrearSalida from "../componentes/Bodega/SalidasBodega/CrearSalida/CrearSalida";
import ListaDeTodasLasSalidas from "../componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaDeTodasLasSalidas";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/generales/GrupoDeInputs.css";

export default function BodegaSalidas() {
  const [vistaBodega, establecerVistaBodega] = useState(0);
  const { idioma } = useConfiguracion();

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_BODEGA_SALIDAS[idioma].CrearSalida,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_BODEGA_SALIDAS[idioma].ListaDeSalidas,
      Icono: "list",
    },
  ];

  //   VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearSalida,
    1: ListaDeTodasLasSalidas,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_BODEGA_SALIDAS[idioma].CrearSalida,
    1: DICCIONARIO_BODEGA_SALIDAS[idioma].ListaDeSalidas,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaBodega];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="cube"
        seccion={DICCIONARIO_BODEGA_SALIDAS[idioma].Bodega}
        subseccion={TituloSubseccion[vistaBodega]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaBodega}
        establecerVista={establecerVistaBodega}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      <Toaster richColors position="top-right" />
    </main>
  );
}
