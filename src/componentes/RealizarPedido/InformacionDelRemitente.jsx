/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoRemitente from "./RegistrarNuevoRemitente";
import SeleccionarRemitente from "./SeleccionarRemitente";

export default function InformacionDelRemitente({
  paso,
  establecerPaso,
  remitente,
  establecerRemitente,
  agencia,
}) {
  const [vistaRemitente, establecerVistaRemitente] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    establecerVistaRemitente,
    remitente,
    establecerRemitente,
    establecerPaso,
    agencia,
    paso,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarNuevoRemitente,
    1: SeleccionarRemitente,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaRemitente];

  return <ComponenteParaRenderizar {...valoresParaLosComponentes} />;
}
