// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeColonias from "./ListaDeColonias";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Ubicaciones/Colonias/AdministrarColonias/AdministrarColonias.css";

export default function AdministrarColonias() {
  const [informacionDeLaColonia, establecerInformacionDeLaColonia] =
    useState(null);
  const [vistaColonia, establecerVistaColonia] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaColonia,
    establecerVistaColonia,
    informacionDeLaColonia,
    establecerInformacionDeLaColonia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeColonias,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaColonia];

  return (
    <div className="AdministrarColonias">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
