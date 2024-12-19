// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_BODEGA_SALIDAS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import SubMenu from "../componentes/Globales/SubMenu";
import CrearSalida from "../componentes/Bodega/SalidasBodega/CrearSalida/CrearSalida";
import ListaDeTodasLasSalidas from "../componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaDeTodasLasSalidas";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/generales/GrupoDeInputs.css";

export default function BodegaSalidas() {
  const [vistaBodega, establecerVistaBodega] = useState(0);
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_BODEGA_SALIDAS[Idioma].CrearSalida,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_BODEGA_SALIDAS[Idioma].ListaDeSalidas,
      Icono: "list",
    },
  ];

  //   VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearSalida,
    1: ListaDeTodasLasSalidas,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_BODEGA_SALIDAS[Idioma].CrearSalida,
    1: DICCIONARIO_BODEGA_SALIDAS[Idioma].ListaDeSalidas,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaBodega];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="cube"
        seccion={DICCIONARIO_BODEGA_SALIDAS[Idioma].Bodega}
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
