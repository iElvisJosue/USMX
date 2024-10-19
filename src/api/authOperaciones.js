import axios from "./axios";

// PETICIÓN PARA REGISTRAR UN NUEVO MOVIMIENTO
export const SolicitudRegistrarMovimiento = (data) =>
  axios.post("/operaciones/RegistrarMovimiento", data);
// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS
export const SolicitudObtenerTodosLosMovimientos = (data) =>
  axios.post("/operaciones/ObtenerTodosLosMovimientos", data);
// PETICIÓN PARA ACTUALIZAR EL ESTADO DE UN MOVIMIENTO
export const SolicitudActualizarEstadoDeUnMovimiento = (data) =>
  axios.put("/operaciones/ActualizarEstadoDeUnMovimiento", data);
// PETICIÓN PARA EDITAR UN MOVIMIENTO
export const SolicitudEditarMovimiento = (data) =>
  axios.put("/operaciones/EditarMovimiento", data);
// PETICIÓN PARA OBTENER LOS PAISES ACTIVOS
export const SolicitudObtenerPaisesActivos = ({ CookieConToken }) =>
  axios.get(`/operaciones/ObtenerPaisesActivos/${CookieConToken}`);
// PETICIÓN PARA OBTENER LOS ESTADOS POR CODIGO DEL PAIS
export const SolicitudObtenerEstadosPorCodigoDelPais = (data) =>
  axios.post("/operaciones/ObtenerEstadosPorCodigoDelPais", data);
// PETICIÓN PARA OBTENER LAS CIUDADES POR ESTADO
export const SolicitudObtenerCiudadesPorEstado = (data) =>
  axios.post("/operaciones/ObtenerCiudadesPorEstado", data);
// PETICIÓN PARA OBTENER LAS COLONIAS POR CP
export const SolicitudObtenerColoniasPorCodigoPostal = (data) =>
  axios.post("/operaciones/ObtenerColoniasPorCodigoPostal", data);
