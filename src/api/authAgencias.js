import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// SOLICITUD PARA REGISTRAR UNA AGENCIA
export const SolicitudRegistrarAgencia = (data) =>
  axios.post("/agencias/RegistrarAgencia", AgregarCookiePeticion(data));
// SOLICITUD PARA BUSCAR LAS AGENCIAS POR FILTRO Y TIPO DE USUARIO
export const SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario = (data) =>
  axios.post(
    "/agencias/BuscarAgenciasPorFiltroYTipoDeUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ACTIVAR O DESACTIVAR UNA AGENCIA
export const SolicitudActualizarEstadoAgencia = (data) =>
  axios.put("/agencias/ActualizarEstadoAgencia", AgregarCookiePeticion(data));
// SOLICITUD PARA ACTUALIZAR LA INFORMACION DE UNA AGENCIA
export const SolicitudActualizarInformacionAgencia = (data) =>
  axios.put(
    "/agencias/ActualizarInformacionAgencia",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA BUSCAR LOS PRODUCTOS QUE TIENE LA AGENCIA
export const SolicitudBuscarProductosQueTieneLaAgencia = (data) =>
  axios.post(
    "/agencias/BuscarProductosQueTieneLaAgencia",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA BUSCAR LOS PRODUCTOS QUE NO TIENE LA AGENCIA
export const SolicitudBuscarProductosQueNoTieneLaAgencia = (data) =>
  axios.post(
    "/agencias/BuscarProductosQueNoTieneLaAgencia",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudAsignarProductoAgencia = (data) =>
  axios.post("/agencias/AsignarProductoAgencia", AgregarCookiePeticion(data));
// SOLICITUD PARA ACTUALIZAR EL PRODUCTO ASIGNADO DE UNA AGENCIA
export const SolicitudActualizarProductoAgencia = (data) =>
  axios.put("/agencias/ActualizarProductoAgencia", AgregarCookiePeticion(data));
// SOLICITUD PARA DESASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudDesasignarProductoAgencia = (data) =>
  axios.post(
    "/agencias/DesasignarProductoAgencia",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA BUSCAR UNA AGENCIAS POR FILTRO
export const SolicitudBuscarAgenciasPorFiltro = (data) =>
  axios.post("/agencias/BuscarAgenciasPorFiltro", AgregarCookiePeticion(data));
// SOLICITUD PARA CREAR UN EXCEL CON LAS AGENCIAS
export const SolicitudCrearYDescargarExcelDeAgencias = (data) =>
  axios.post(
    "/agencias/CrearYDescargarExcelDeAgencias",
    AgregarCookiePeticion(data),
    {
      responseType: "blob",
    }
  );
// SOLICITUD PARA SUBIR UN ARCHIVO EXCEL DE REMITENTES
export const SolicitudSubirArchivoRemitentes = (data) =>
  axios.post("/agencias/SubirArchivoRemitentes", data);
// SOLICITUD PARA SUBIR UN ARCHIVO EXCEL DE DESTINATARIOS
export const SolicitudSubirArchivoDestinatarios = (data) =>
  axios.post("/agencias/SubirArchivoDestinatarios", data);
