/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS COMPONENTES A USAR
import FormularioDatosDeEntrada from "./FormularioDatosDeEntrada";
import FormularioBusquedaEntradas from "./FormularioBusquedaEntradas";
import ListaEntradas from "./ListaEntradas";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/EntradasBodega/CrearEntrada/CrearEntrada.css";

export default function CrearEntrada({ Idioma }) {
  const [vista, establecerVista] = useState(0);
  const [entrada, establecerEntrada] = useState([]);
  const [informacionDeLaEntrada, establecerInformacionDeLaEntrada] =
    useState(null);

  // VALORES COMPARTIDOS
  const valoresParaLosComponentes = {
    Idioma,
    entrada,
    establecerEntrada,
    vista,
    establecerVista,
    informacionDeLaEntrada,
    establecerInformacionDeLaEntrada,
  };

  return (
    <div className="CrearEntrada">
      {vista === 0 && (
        <FormularioDatosDeEntrada {...valoresParaLosComponentes} />
      )}
      {vista === 1 && (
        <FormularioBusquedaEntradas {...valoresParaLosComponentes} />
      )}
      {vista === 1 && entrada.length > 0 && (
        <ListaEntradas {...valoresParaLosComponentes} />
      )}
    </div>
  );
}
