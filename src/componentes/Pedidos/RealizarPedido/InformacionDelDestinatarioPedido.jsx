/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoDestinatarioPedido from "./RegistrarNuevoDestinatarioPedido";
import SeleccionarDestinatarioPedido from "./SeleccionarDestinatarioPedido";
import SeleccionarOcurrePedido from "./SeleccionarOcurrePedido";

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
    0: RegistrarNuevoDestinatarioPedido,
    1: SeleccionarDestinatarioPedido,
    2: SeleccionarOcurrePedido,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaDestinatario];

  return <ComponenteParaRenderizar {...valoresParaLosComponentes} />;
}
