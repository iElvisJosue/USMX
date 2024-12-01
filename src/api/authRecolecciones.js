import axios from "./axios";

// PETICIÓN PARA CREAR UNA RECOLECCIÓN
export const SolicitudCrearRecoleccion = (data) =>
  axios.post("/recolecciones/CrearRecoleccion", data);
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA
export const SolicitudObtenerInformacionDeGuia = ({
  CookieConToken,
  GuiaPedido,
}) =>
  axios.get(
    `/recolecciones/ObtenerInformacionDeGuia/${CookieConToken}/${GuiaPedido}`
  );
// PETICIÓN PARA BUSCAR TODAS LAS RECOLECCIONES POR FILTRO
export const SolicitudBuscarTodasLasRecoleccionesPorFiltro = (data) =>
  axios.post("/recolecciones/BuscarTodasLasRecoleccionesPorFiltro", data);
// PETICIÓN PARA BUSCAR TODAS LAS RECOLECCIONES POR FECHA
export const SolicitudBuscarTodasLasRecoleccionesPorFecha = (data) =>
  axios.post("/recolecciones/BuscarTodasLasRecoleccionesPorFecha", data);
// PETICIÓN PARA BUSCAR LAS RECOLECCIONES DE UN CHOFER POR FILTRO
export const SolicitudBuscarRecoleccionesDeUnChoferPorFiltro = (data) =>
  axios.post("/recolecciones/BuscarRecoleccionesDeUnChoferPorFiltro", data);
// PETICIÓN PARA BUSCAR LAS RECOLECCIONES DE UN CHOFER POR FECHA
export const SolicitudBuscarRecoleccionesDeUnChoferPorFecha = (data) =>
  axios.post("/recolecciones/BuscarRecoleccionesDeUnChoferPorFecha", data);
