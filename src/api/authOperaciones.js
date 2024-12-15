import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS
export const SolicitudObtenerTodosLosMovimientos = (data) =>
  axios.post(
    "/operaciones/ObtenerTodosLosMovimientos",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA REGISTRAR UN NUEVO MOVIMIENTO
export const SolicitudRegistrarMovimiento = (data) =>
  axios.post("/operaciones/RegistrarMovimiento", AgregarCookiePeticion(data));
// PETICIÓN PARA ACTUALIZAR EL ESTADO DE UN MOVIMIENTO
export const SolicitudActualizarEstadoDeUnMovimiento = (data) =>
  axios.put(
    "/operaciones/ActualizarEstadoDeUnMovimiento",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA EDITAR UN MOVIMIENTO
export const SolicitudEditarMovimiento = (data) =>
  axios.put("/operaciones/EditarMovimiento", AgregarCookiePeticion(data));
// PETICIÓN PARA REGISTRAR UN NUEVO TIPO DE CARGA
export const SolicitudRegistrarTipoDeCarga = (data) =>
  axios.post("/operaciones/RegistrarTipoDeCarga", AgregarCookiePeticion(data));
// PETICIÓN PARA OBTENER LOS TIPOS DE CARGA
export const SolicitudObtenerTiposDeCarga = (data) =>
  axios.post("/operaciones/ObtenerTiposDeCarga", AgregarCookiePeticion(data));
// PETICIÓN PARA ELIMINAR UN TIPO DE CARGA
export const SolicitudEliminarTipoDeCarga = ({ idCarga }) =>
  axios.delete(
    `/operaciones/EliminarTipoDeCarga/${COOKIE_CON_TOKEN}/${idCarga}`
  );
// PETICIÓN PARA REGISTRAR UN NUEVO TIPO DE ENVIO
export const SolicitudRegistrarTipoDeEnvio = (data) =>
  axios.post("/operaciones/RegistrarTipoDeEnvio", AgregarCookiePeticion(data));
// PETICIÓN PARA OBTENER LOS TIPOS DE ENVIO
export const SolicitudObtenerTiposDeEnvio = (data) =>
  axios.post("/operaciones/ObtenerTiposDeEnvio", AgregarCookiePeticion(data));
// PETICIÓN PARA ELIMINAR UN TIPO DE ENVIO
export const SolicitudEliminarTipoDeEnvio = ({ idTipoEnvio }) =>
  axios.delete(
    `/operaciones/EliminarTipoDeEnvio/${COOKIE_CON_TOKEN}/${idTipoEnvio}`
  );
// PETICIÓN PARA OBTENER LA API DE GOOGLE MAPS AUTO COMPLETADO
export const SolicitudObtenerApiGoogleMapsAutoCompletado = () =>
  axios.get(
    `/operaciones/ObtenerApiGoogleMapsAutoCompletado/${COOKIE_CON_TOKEN}`
  );
