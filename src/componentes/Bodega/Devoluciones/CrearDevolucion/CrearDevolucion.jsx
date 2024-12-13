/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS COMPONENTES A USAR
import FormularioDevolucion from "./FormularioDevolucion";
import ListaDevoluciones from "./ListaDevoluciones";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/Devoluciones/CrearDevolucion/CrearDevolucion.css";

export default function CrearDevolucion({ Idioma }) {
  const [devolucion, establecerDevolucion] = useState([]);

  // VALORES COMPARTIDOS
  const valoresParaLosComponentes = {
    Idioma,
    devolucion,
    establecerDevolucion,
  };

  return (
    <div className="CrearDevolucion">
      <FormularioDevolucion {...valoresParaLosComponentes} />
      {devolucion.length > 0 && (
        <ListaDevoluciones {...valoresParaLosComponentes} />
      )}
    </div>
  );
}
