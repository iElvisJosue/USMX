import axios from "./axios";

// PETICIÓN PARA REGISTRAR GUARDAR LA INFORMACIÓN DEL REMITENTE, DESTINATARIO Y PEDIDO
export const SolicitudGuardarTodaLaInformacion = (data) =>
  axios.post("/pedidos/GuardarTodaLaInformacion", data);
// PETICIÓN PARA BUSCAR LOS PEDIDOS POR FILTRO
export const SolicitudBuscarPedidosPorFiltro = (data) =>
  axios.post("/pedidos/BuscarPedidosPorFiltro", data);
// PETICIÓN PARA BUSCAR PEDIDOS POR PAQUETE
export const SolicitudBuscarPedidosPorPaquete = (data) =>
  axios.post("/pedidos/BuscarPedidosPorPaquete", data);
