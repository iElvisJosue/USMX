import axios from "./axios";

// PETICIÓN PARA REGISTRAR UNA AGENCIA
export const SolicitudRegistrarAgencia = (data) =>
  axios.post("/agencias/RegistrarAgencia", data);
// PETICIÓN PARA BUSCAR LAS AGENCIAS POR FILTRO Y TIPO DE USUARIO
export const SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario = (data) =>
  axios.post("/agencias/BuscarAgenciasPorFiltroYTipoDeUsuario", data);
// SOLICITUD PARA BUSCAR LOS PRODUCTOS QUE TIENE LA AGENCIA
export const SolicitudBuscarProductosQueTieneLaAgencia = (data) =>
  axios.post("/agencias/BuscarProductosQueTieneLaAgencia", data);
// SOLICITUD PARA BUSCAR LOS PRODUCTOS QUE NO TIENE LA AGENCIA
export const SolicitudBuscarProductosQueNoTieneLaAgencia = (data) =>
  axios.post("/agencias/BuscarProductosQueNoTieneLaAgencia", data);
// SOLICITUD PARA ASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudAsignarProductoAgencia = (data) =>
  axios.post("/agencias/AsignarProductoAgencia", data);
// SOLICITUD PARA DESASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudDesasignarProductoAgencia = (data) =>
  axios.post("/agencias/DesasignarProductoAgencia", data);
