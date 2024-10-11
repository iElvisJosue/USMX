import axios from "./axios";

// PETICIÓN PARA REGISTRAR UNA NUEVA OCURRENCIA
export const SolicitudRegistrarOcurre = (data) =>
  axios.post("/ocurre/RegistrarOcurre", data);
// PETICIÓN PARA BUSCAR LAS OCURRENCIAS POR FILTRO
export const SolicitudBuscarOcurresPorFiltro = (data) =>
  axios.post("/ocurre/BuscarOcurresPorFiltro", data);
// PETICIÓN PARA ACTIVAR O DESACTIVAR UN OCURRE
export const SolicitudActualizarEstadoOcurre = (data) =>
  axios.put("/ocurre/ActualizarEstadoOcurre", data);
// PETICION PARA ACTUALIZAR LA INFORMACIÓN DE UNA OCURRENCIA
export const SolicitudActualizarInformacionOcurre = (data) =>
  axios.put("/ocurre/ActualizarInformacionOcurre", data);
