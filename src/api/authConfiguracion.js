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
// PETICIÓN PARA REGISTRAR UN NUEVO TIPO DE CARGA
export const SolicitudRegistrarTipoDeCarga = (data) =>
  axios.post("/configuracion/RegistrarTipoDeCarga", data);
// PETICIÓN PARA ELIMINAR UN TIPO DE CARGA
export const SolicitudEliminarTipoDeCarga = ({ CookieConToken, idCarga }) =>
  axios.delete(
    `/configuracion/EliminarTipoDeCarga/${CookieConToken}/${idCarga}`
  );
// PETICIÓN PARA REGISTRAR UN NUEVO TIPO DE ENVIO
export const SolicitudRegistrarTipoDeEnvio = (data) =>
  axios.post("/configuracion/RegistrarTipoDeEnvio", data);
// PETICIÓN PARA ELIMINAR UN TIPO DE ENVIO
export const SolicitudEliminarTipoDeEnvio = ({ CookieConToken, idTipoEnvio }) =>
  axios.delete(
    `/configuracion/EliminarTipoDeEnvio/${CookieConToken}/${idTipoEnvio}`
  );
// PETICIÓN PARA BUSCAR LOS PAISES POR FILTRO
export const SolicitudBuscarPaisesPorFiltro = (data) =>
  axios.post("/configuracion/BuscarPaisesPorFiltro", data);
// PETICIÓN PARA BUSCAR LOS ESTADOS POR FILTRO
export const SolicitudBuscarEstadosPorFiltro = (data) =>
  axios.post("/configuracion/BuscarEstadosPorFiltro", data);
// PETICIÓN PARA BUSCAR LAS CIUDADES POR FILTRO
export const SolicitudBuscarCiudadesPorFiltro = (data) =>
  axios.post("/configuracion/BuscarCiudadesPorFiltro", data);
// PETICIÓN PARA BUSCAR LAS COLONIAS POR FILTRO
export const SolicitudBuscarColoniasPorFiltro = (data) =>
  axios.post("/configuracion/BuscarColoniasPorFiltro", data);
