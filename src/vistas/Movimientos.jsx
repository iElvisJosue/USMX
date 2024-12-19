// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_MOVIMIENTOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import RegistrarMovimientos from "../componentes/Movimientos/RegistrarMovimientos";
import ListaDeMovimientos from "../componentes/Movimientos/ListaDeMovimientos";
import EditarMovimiento from "../componentes/Movimientos/EditarMovimiento";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerMovimientos from "../hooks/Operaciones/Movimientos/useObtenerMovimientos";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Movimientos.css";

export default function Movimientos() {
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
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
    Idioma,
    vista,
    establecerVista,
    movimientos,
    obtenerMovimientosNuevamente,
    establecerObtenerMovimientosNuevamente,
    informacionDelMovimiento,
    establecerInformacionDelMovimiento,
    filtro,
    establecerFiltro,
    cargandoMovimientos,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_MOVIMIENTOS[Idioma].Movimientos,
    1: DICCIONARIO_MOVIMIENTOS[Idioma].EditarMovimiento,
  };

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="code-working"
        seccion={DICCIONARIO_MOVIMIENTOS[Idioma].Operaciones}
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
    </main>
  );
}
