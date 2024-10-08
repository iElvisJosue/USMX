import axios from "./axios";

// PETICIÓN PARA OBTENER LOS TIPOS DE CARGA
export const SolicitudObtenerTiposDeCarga = (data) =>
  axios.post("/configuracion/ObtenerTiposDeCarga", data);
// PETICIÓN PARA OBTENER LOS TIPOS DE ENVIO
export const SolicitudObtenerTiposDeEnvio = (data) =>
  axios.post("/configuracion/ObtenerTiposDeEnvio", data);
// PETICIÓN PARA OBTENER EL MODO OSCURO DEL USUARIO
export const SolicitudObtenerModoOscuro = (idUsuario) =>
  axios.get(`/configuracion/ObtenerModoOscuro/${idUsuario}`);
// PETICIÓN PARA ACTUALIZAR EL MODO OSCURO DEL USUARIO
export const SolicitudActualizarModoOscuro = (data) =>
  axios.put("/configuracion/ActualizarModoOscuro", data);
