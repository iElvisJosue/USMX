import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA REGISTRAR UN NUEVO TIPO DE CARGA
export const SolicitudRegistrarTipoDeCarga = (data) =>
  axios.post(
    "/configuracion/RegistrarTipoDeCarga",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LOS TIPOS DE CARGA
export const SolicitudObtenerTiposDeCarga = (data) =>
  axios.post("/configuracion/ObtenerTiposDeCarga", AgregarCookiePeticion(data));
// PETICIÓN PARA ELIMINAR UN TIPO DE CARGA
export const SolicitudEliminarTipoDeCarga = ({ idCarga }) =>
  axios.delete(
    `/configuracion/EliminarTipoDeCarga/${COOKIE_CON_TOKEN}/${idCarga}`
  );
// PETICIÓN PARA REGISTRAR UN NUEVO TIPO DE ENVIO
export const SolicitudRegistrarTipoDeEnvio = (data) =>
  axios.post(
    "/configuracion/RegistrarTipoDeEnvio",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LOS TIPOS DE ENVIO
export const SolicitudObtenerTiposDeEnvio = (data) =>
  axios.post("/configuracion/ObtenerTiposDeEnvio", AgregarCookiePeticion(data));
// PETICIÓN PARA ELIMINAR UN TIPO DE ENVIO
export const SolicitudEliminarTipoDeEnvio = ({ idTipoEnvio }) =>
  axios.delete(
    `/configuracion/EliminarTipoDeEnvio/${COOKIE_CON_TOKEN}/${idTipoEnvio}`
  );
// PETICIÓN PARA OBTENER LA API DE GOOGLE MAPS AUTO COMPLETADO
export const SolicitudObtenerApiGoogleMapsAutoCompletado = () =>
  axios.get(
    `/configuracion/ObtenerApiGoogleMapsAutoCompletado/${COOKIE_CON_TOKEN}`
  );
