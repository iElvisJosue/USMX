/* eslint-disable react/prop-types */
// LOS ESTILOS ESTÁN EN RealizarPedido.css
export default function AgenciaSeleccionada({
  NombreAgencia,
  colSpan = "Uno",
}) {
  const ClaseAgenciaSeleccionada = `RealizarPedido__AgenciaSeleccionada ${colSpan}`;
  return (
    <small className={ClaseAgenciaSeleccionada}>
      Pedido para la agencia: <b>{NombreAgencia}</b>
    </small>
  );
}
