/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS COMPONENTES A USAR
import FormularioRecoleccion from "./FormularioRecoleccion";
import ListaDeRecoleccion from "./ListaDeRecoleccion";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Recolecciones/CrearRecoleccion/CrearRecoleccion.css";

export default function CrearRecoleccion({ idioma }) {
  const [recoleccion, establecerRecoleccion] = useState([]);

  // VALORES COMPARTIDOS
  const valoresParaLosComponentes = {
    idioma,
    recoleccion,
    establecerRecoleccion,
  };

  return (
    <div className="CrearRecoleccion">
      <FormularioRecoleccion {...valoresParaLosComponentes} />
      {recoleccion.length > 0 && (
        <ListaDeRecoleccion {...valoresParaLosComponentes} />
      )}
    </div>
  );
}
