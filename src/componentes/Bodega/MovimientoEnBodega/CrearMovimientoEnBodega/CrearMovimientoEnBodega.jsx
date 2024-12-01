/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS COMPONENTES A USAR
import FormularioMovimientoEnBodega from "./FormularioMovimientoEnBodega";
import ListaMovimientosEnBodega from "./ListaMovimientosEnBodega";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/CrearMovimientoEnBodega/CrearMovimientoEnBodega.css";

export default function CrearMovimientoEnBodega({ idioma }) {
  const [movimiento, establecerMovimiento] = useState([]);

  // VALORES COMPARTIDOS
  const valoresParaLosComponentes = {
    idioma,
    movimiento,
    establecerMovimiento,
  };

  return (
    <div className="CrearMovimientoEnBodega">
      <FormularioMovimientoEnBodega {...valoresParaLosComponentes} />
      {movimiento.length > 0 && (
        <ListaMovimientosEnBodega {...valoresParaLosComponentes} />
      )}
    </div>
  );
}
