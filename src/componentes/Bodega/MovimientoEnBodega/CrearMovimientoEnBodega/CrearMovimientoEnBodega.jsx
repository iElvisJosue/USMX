/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS COMPONENTES A USAR
import FormularioMovimientoEnBodega from "./FormularioMovimientoEnBodega";
import ListaMovimientosEnBodega from "./ListaMovimientosEnBodega";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/CrearMovimientoEnBodega/CrearMovimientoEnBodega.css";

export default function CrearMovimientoEnBodega({ Idioma }) {
  const [movimiento, establecerMovimiento] = useState([]);

  // VALORES COMPARTIDOS
  const valoresParaLosComponentes = {
    Idioma,
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
