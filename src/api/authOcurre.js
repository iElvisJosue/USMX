import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA REGISTRAR UNA NUEVA OCURRENCIA
export const SolicitudRegistrarOcurre = (data) =>
  axios.post("/ocurre/RegistrarOcurre", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR LAS OCURRENCIAS POR FILTRO
export const SolicitudBuscarOcurresPorFiltro = (data) =>
  axios.post("/ocurre/BuscarOcurresPorFiltro", AgregarCookiePeticion(data));
// PETICIÓN PARA ACTIVAR O DESACTIVAR UN OCURRE
export const SolicitudActualizarEstadoOcurre = (data) =>
  axios.put("/ocurre/ActualizarEstadoOcurre", AgregarCookiePeticion(data));
// PETICION PARA ACTUALIZAR LA INFORMACIÓN DE UNA OCURRENCIA
export const SolicitudActualizarInformacionOcurre = (data) =>
  axios.put("/ocurre/ActualizarInformacionOcurre", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR LAS OCURRENCIAS POR ACTIVAS POR FILTRO
export const SolicitudBuscarOcurresActivosPorFiltro = (data) =>
  axios.post(
    "/ocurre/BuscarOcurresActivosPorFiltro",
    AgregarCookiePeticion(data)
  );
