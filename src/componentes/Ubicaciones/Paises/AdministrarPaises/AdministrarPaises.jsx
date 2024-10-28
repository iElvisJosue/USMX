// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDePaises from "./ListaDePaises";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Ubicaciones/Paises/AdministrarPaises/AdministrarPaises.css";

export default function AdministrarPaises() {
  const [informacionDelPais, establecerInformacionDelPais] = useState(null);

  const [vistaPais, establecerVistaPais] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaPais,
    establecerVistaPais,
    informacionDelPais,
    establecerInformacionDelPais,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDePaises,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaPais];

  return (
    <div className="AdministrarPaises">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
