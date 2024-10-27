/* eslint-disable react/prop-types */
// LOS ESTILOS ESTÁN EN RealizarPedido.css
export default function AgenciaSeleccionadaPedido({ NombreAgencia }) {
  return (
    <small className="RealizarPedido__AgenciaSeleccionadaPedido">
      Pedido para la agencia: <b>{NombreAgencia}</b>
    </small>
  );
}
