/* eslint-disable react/prop-types */
// LOS ESTILOS ESTÁN EN RealizarPedido.css

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_AGENCIA_SELECCIONADA_PEDIDO } from "../../../diccionario/Diccionario";

export default function AgenciaSeleccionadaPedido({
  idioma = "es",
  NombreAgencia,
}) {
  return (
    <small className="RealizarPedido__AgenciaSeleccionadaPedido">
      {DICCIONARIO_AGENCIA_SELECCIONADA_PEDIDO[idioma].PedidoParaLaAgencia}{" "}
      <b>{NombreAgencia}</b>
    </small>
  );
}
