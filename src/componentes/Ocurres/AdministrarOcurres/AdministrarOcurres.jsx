/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeOcurres from "./ListaDeOcurres";
import EditarOcurre from "./EditarOcurre";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Ocurres/AdministrarOcurres/AdministrarOcurres.css";

export default function AdministrarOcurres({ idioma }) {
  const [informacionDelOcurre, establecerInformacionDelOcurre] = useState(null);
  const [vistaOcurres, establecerVistaOcurres] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    vistaOcurres,
    establecerVistaOcurres,
    informacionDelOcurre,
    establecerInformacionDelOcurre,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeOcurres,
    1: EditarOcurre,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOcurres];

  return (
    <div className="AdministrarOcurres">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
