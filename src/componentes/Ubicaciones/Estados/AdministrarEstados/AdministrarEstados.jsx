// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeEstados from "./ListaDeEstados";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Ubicaciones/Estados/AdministrarEstados/AdministrarEstados.css";

export default function AdministrarEstados() {
  const [informacionDelEstado, establecerInformacionDelEstado] = useState(null);
  const [vistaEstado, establecerVistaEstado] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaEstado,
    establecerVistaEstado,
    informacionDelEstado,
    establecerInformacionDelEstado,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeEstados,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaEstado];

  return (
    <div className="AdministrarEstados">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
