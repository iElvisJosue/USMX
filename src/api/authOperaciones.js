import axios from "./axios";

// PETICIÓN PARA REGISTRAR UN NUEVO MOVIMIENTO
export const SolicitudRegistrarMovimiento = (data) =>
  axios.post("/operaciones/RegistrarMovimiento", data);
// RUTA PARA OBTENER TODOS LOS MOVIMIENTOS
export const SolicitudObtenerTodosLosMovimientos = (data) =>
  axios.post("/operaciones/ObtenerTodosLosMovimientos", data);
// RUTA PARA ACTUALIZAR EL ESTADO DE UN MOVIMIENTO
export const SolicitudActualizarEstadoDeUnMovimiento = (data) =>
  axios.put("/operaciones/ActualizarEstadoDeUnMovimiento", data);
// RUTA PARA EDITAR UN MOVIMIENTO
export const SolicitudEditarMovimiento = (data) =>
  axios.put("/operaciones/EditarMovimiento", data);
