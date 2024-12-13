import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA ACTUALIZAR EL MODO OSCURO DEL USUARIO
export const SolicitudActualizarModoOscuro = (data) =>
  axios.put("/sistema/ActualizarModoOscuro", AgregarCookiePeticion(data));
// PETICIÓN PARA ACTUALIZAR IDIOMAS DEL USUARIO
export const SolicitudActualizarIdioma = (data) =>
  axios.put("/sistema/ActualizarIdioma", AgregarCookiePeticion(data));
// SOLICITUD PARA OBTENER EL LOGO Y EL NOMBRE DEL SISTEMA PARA EL LOGIN
export const SolicitudObtenerNombreYLogoDelSistema = () =>
  axios.get("/sistema/InformacionDelSistema");
// SOLICITUD PARA VERIFICAR EL TOKEN DE ACCESO DE UN USUARIO
export const SolicitudVerificarToken = (data) =>
  axios.post("/sistema/VerificarToken", data);
// SOLICITUD PARA ACTUALIZAR LA FOTO DE UN USUARIO
export const SolicitudActualizarLogoSistema = (data) =>
  axios.put("/sistema/ActualizarLogoSistema", data);
export const SolicitudActualizarInformacionDelSistema = (data) =>
  axios.put(
    "/sistema/ActualizarInformacionDelSistema",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER EL RESUMEN DIARIO
export const SolicitudObtenerResumenDiario = ({ FechaDeHoy }) =>
  axios.get(`/sistema/ObtenerResumenDiario/${FechaDeHoy}`);
// SOLICITUD PARA CERRAR SESION
export const SolicitudCerrarSesion = () => axios.post("/sistema/CerrarSesion");
