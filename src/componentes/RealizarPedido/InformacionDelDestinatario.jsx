/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoDestinatario from "./RegistrarNuevoDestinatario";
import SeleccionarDestinatario from "./SeleccionarDestinatario";
import SeleccionarOcurre from "./SeleccionarOcurre";

export default function InformacionDelDestinatario({
  paso,
  establecerPaso,
  destinatario,
  establecerDestinatario,
  agencia,
}) {
  const [vistaDestinatario, establecerVistaDestinatario] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    establecerVistaDestinatario,
    destinatario,
    establecerDestinatario,
    establecerPaso,
    agencia,
    paso,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarNuevoDestinatario,
    1: SeleccionarDestinatario,
    2: SeleccionarOcurre,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaDestinatario];

  return <ComponenteParaRenderizar {...valoresParaLosComponentes} />;
}
