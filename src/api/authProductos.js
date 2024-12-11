import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA OBTENER REGISTRAR UN PRODUCTO
export const SolicitudRegistrarProducto = (data) =>
  axios.post("/productos/RegistrarProducto", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR LOS PRODUCTOS POR FILTRO
export const SolicitudBuscarProductosPorFiltro = (data) =>
  axios.post(
    "/productos/BuscarProductosPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LOS PRODUCTOS DE UNA AGENCIA
export const SolicitudObtenerProductosPorAgencia = (data) =>
  axios.post(
    "/productos/ObtenerProductosPorAgencia",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE TIENE UN PRODUCTO
export const SolicitudBuscarAgenciasQueTieneUnProducto = (data) =>
  axios.post(
    "/productos/BuscarAgenciasQueTieneUnProducto",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE NO TIENE UN PRODUCTO
export const SolicitudBuscarAgenciasQueNoTieneUnProducto = (data) =>
  axios.post(
    "/productos/BuscarAgenciasQueNoTieneUnProducto",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudAsignarAgenciaAlProducto = (data) =>
  axios.post(
    "/productos/AsignarAgenciaAlProducto",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA DESASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudDesasignarAgenciaAlProducto = (data) =>
  axios.post(
    "/productos/DesasignarAgenciaAlProducto",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ACTUALIZAR LA INFORMACION DE UN PRODUCTO
export const SolicitudActualizarInformacionDeUnProducto = (data) =>
  axios.put(
    "/productos/ActualizarInformacionDeUnProducto",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ACTIVAR O DESACTIVAR UN PRODUCTO
export const SolicitudActualizarEstadoProducto = (data) =>
  axios.put("/productos/ActualizarEstadoProducto", AgregarCookiePeticion(data));
