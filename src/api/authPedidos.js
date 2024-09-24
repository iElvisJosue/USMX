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
// PETICIÓN PARA BUSCAR LOS REMITENTES POR AGENCIA
export const SolicitudBuscarRemitentesPorAgencia = (data) =>
  axios.post("/pedidos/BuscarRemitentesPorAgencia", data);
// PETICIÓN PARA BUSCAR LOS DESTINATARIOS POR AGENCIA
export const SolicitudBuscarDestinatariosPorAgencia = (data) =>
  axios.post("/pedidos/BuscarDestinatariosPorAgencia", data);
// PETICIÓN PARA BUSCAR LOS ÚLTIMOS 10 PEDIDOS REALIZADO
export const SolicitudBuscarUltimosDiezPedidos = () =>
  axios.get("/pedidos/BuscarUltimosDiezPedidos");
