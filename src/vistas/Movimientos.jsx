// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_MOVIMIENTOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";
import RegistrarMovimientos from "../componentes/Movimientos/RegistrarMovimientos";
import ListaDeMovimientos from "../componentes/Movimientos/ListaDeMovimientos";
import EditarMovimiento from "../componentes/Movimientos/EditarMovimiento";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerMovimientos from "../hooks/useObtenerMovimientos";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Movimientos.css";

export default function Movimientos() {
  const { idioma } = useConfiguracion();
  const {
    movimientos,
    cargandoMovimientos,
    obtenerMovimientosNuevamente,
    establecerObtenerMovimientosNuevamente,
    filtro,
    establecerFiltro,
  } = useObtenerMovimientos();
  const [vista, establecerVista] = useState(0);
  const [informacionDelMovimiento, establecerInformacionDelMovimiento] =
    useState(null);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    vista,
    establecerVista,
    movimientos,
    obtenerMovimientosNuevamente,
    establecerObtenerMovimientosNuevamente,
    informacionDelMovimiento,
    establecerInformacionDelMovimiento,
    filtro,
    establecerFiltro,
  };

  const TituloSubseccion = {
    0: "",
    1: DICCIONARIO_MOVIMIENTOS[idioma].EditarMovimiento,
  };

  if (cargandoMovimientos) return <Cargando />;

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="car"
        seccion={DICCIONARIO_MOVIMIENTOS[idioma].Movimientos}
        subseccion={TituloSubseccion[vista]}
      />
      <div className="Movimientos">
        {vista === 0 ? (
          <>
            <RegistrarMovimientos {...valoresParaLosComponentes} />
            <ListaDeMovimientos {...valoresParaLosComponentes} />
          </>
        ) : (
          <EditarMovimiento {...valoresParaLosComponentes} />
        )}
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
