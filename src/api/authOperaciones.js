import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA REGISTRAR UN NUEVO MOVIMIENTO
export const SolicitudRegistrarMovimiento = (data) =>
  axios.post("/operaciones/RegistrarMovimiento", AgregarCookiePeticion(data));
// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS
export const SolicitudObtenerTodosLosMovimientos = (data) =>
  axios.post(
    "/operaciones/ObtenerTodosLosMovimientos",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA ACTUALIZAR EL ESTADO DE UN MOVIMIENTO
export const SolicitudActualizarEstadoDeUnMovimiento = (data) =>
  axios.put(
    "/operaciones/ActualizarEstadoDeUnMovimiento",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA EDITAR UN MOVIMIENTO
export const SolicitudEditarMovimiento = (data) =>
  axios.put("/operaciones/EditarMovimiento", AgregarCookiePeticion(data));
