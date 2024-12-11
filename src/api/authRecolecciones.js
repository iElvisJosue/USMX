import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA CREAR UNA RECOLECCIÓN
export const SolicitudCrearRecoleccion = (data) =>
  axios.post("/recolecciones/CrearRecoleccion", AgregarCookiePeticion(data));
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA
export const SolicitudObtenerInformacionDeGuia = ({ GuiaPedido }) =>
  axios.get(
    `/recolecciones/ObtenerInformacionDeGuia/${COOKIE_CON_TOKEN}/${GuiaPedido}`
  );
// PETICIÓN PARA BUSCAR TODAS LAS RECOLECCIONES POR FILTRO
export const SolicitudBuscarTodasLasRecoleccionesPorFiltro = (data) =>
  axios.post(
    "/recolecciones/BuscarTodasLasRecoleccionesPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR TODAS LAS RECOLECCIONES POR FECHA
export const SolicitudBuscarTodasLasRecoleccionesPorFecha = (data) =>
  axios.post(
    "/recolecciones/BuscarTodasLasRecoleccionesPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS RECOLECCIONES DE UN CHOFER POR FILTRO
export const SolicitudBuscarRecoleccionesDeUnChoferPorFiltro = (data) =>
  axios.post(
    "/recolecciones/BuscarRecoleccionesDeUnChoferPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS RECOLECCIONES DE UN CHOFER POR FECHA
export const SolicitudBuscarRecoleccionesDeUnChoferPorFecha = (data) =>
  axios.post(
    "/recolecciones/BuscarRecoleccionesDeUnChoferPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA RECOLECCION
export const SolicitudObtenerPedidosDeUnaRecoleccion = ({ idRecoleccion }) =>
  axios.get(
    `/recolecciones/ObtenerPedidosDeUnaRecoleccion/${COOKIE_CON_TOKEN}/${idRecoleccion}`
  );
