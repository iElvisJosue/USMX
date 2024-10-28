// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeCiudades from "./ListaDeCiudades";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Ubicaciones/Ciudades/AdministrarCiudades/AdministrarCiudades.css";

export default function AdministrarCiudades() {
  const [informacionDeLaCiudad, establecerInformacionDeLaCiudad] =
    useState(null);
  const [vistaCiudad, establecerVistaCiudad] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaCiudad,
    establecerVistaCiudad,
    informacionDeLaCiudad,
    establecerInformacionDeLaCiudad,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeCiudades,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaCiudad];

  return (
    <div className="AdministrarCiudades">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
