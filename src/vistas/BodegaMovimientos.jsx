// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_BODEGA_MOVIMIENTOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import CrearMovimientoEnBodega from "../componentes/Bodega/MovimientoEnBodega/CrearMovimientoEnBodega/CrearMovimientoEnBodega";
import ListaDeMovimientosEnBodega from "../componentes/Bodega/MovimientoEnBodega/ListaDeMovimientosEnBodega/ListaDeMovimientosEnBodega";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/generales/GrupoDeInputs.css";

export default function BodegaMovimientos() {
  const [vistaBodega, establecerVistaBodega] = useState(0);
  const { idioma } = useConfiguracion();

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_BODEGA_MOVIMIENTOS[idioma].CrearMovimiento,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_BODEGA_MOVIMIENTOS[idioma].ListaDeMovimientos,
      Icono: "list",
    },
  ];

  //   VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearMovimientoEnBodega,
    1: ListaDeMovimientosEnBodega,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_BODEGA_MOVIMIENTOS[idioma].Movimientos,
    1: DICCIONARIO_BODEGA_MOVIMIENTOS[idioma].ListaDeMovimientos,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaBodega];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="cube"
        seccion={DICCIONARIO_BODEGA_MOVIMIENTOS[idioma].Bodega}
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
