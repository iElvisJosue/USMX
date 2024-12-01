/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS COMPONENTES A USAR
import FormularioDatosDeSalida from "./FormularioDatosDeSalida";
import FormularioBusquedaSalidas from "./FormularioBusquedaSalidas";
import ListaSalidas from "./ListaSalidas";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/SalidasBodega/CrearSalida/CrearSalida.css";

export default function CrearSalida({ idioma }) {
  const [vista, establecerVista] = useState(0);
  const [salida, establecerSalida] = useState([]);
  const [informacionDeLaSalida, establecerInformacionDeLaSalida] =
    useState(null);

  // VALORES COMPARTIDOS
  const valoresParaLosComponentes = {
    idioma,
    salida,
    establecerSalida,
    vista,
    establecerVista,
    informacionDeLaSalida,
    establecerInformacionDeLaSalida,
  };

  return (
    <div className="CrearSalida">
      {vista === 0 && (
        <FormularioDatosDeSalida {...valoresParaLosComponentes} />
      )}
      {vista === 1 && (
        <FormularioBusquedaSalidas {...valoresParaLosComponentes} />
      )}
      {vista === 1 && salida.length > 0 && (
        <ListaSalidas {...valoresParaLosComponentes} />
      )}
    </div>
  );
}
