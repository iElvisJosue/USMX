import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS DE ENTRADA
export const SolicitudObtenerMovimientosDeEntrada = () =>
  axios.get(`/bodega/ObtenerMovimientosDeEntrada/${COOKIE_CON_TOKEN}`);
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA ENTRADAS
export const SolicitudObtenerInformacionDeGuiaParaEntradas = ({
  GuiaPedido,
  idMovimientoEntrada,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaEntradas/${COOKIE_CON_TOKEN}/${GuiaPedido}/${idMovimientoEntrada}`
  );
// PETICIÓN PARA CREAR UNA ENTRADA
export const SolicitudCrearEntrada = (data) =>
  axios.post("/bodega/CrearEntrada", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR TODAS LAS DEVOLUCIONES POR FILTRO
export const SolicitudBuscarTodasLasEntradasABodegaPorFiltro = (data) =>
  axios.post(
    "/bodega/BuscarTodasLasEntradasABodegaPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR TODAS LAS ENTRADAS A BODEGA POR FECHA
export const SolicitudBuscarTodasLasEntradasABodegaPorFecha = (data) =>
  axios.post(
    "/bodega/BuscarTodasLasEntradasABodegaPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS ENTRADAS DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS ENTRADAS DE UN BODEGUERO POR FECHA
export const SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA MOVIMIENTO EN BODEGA
export const SolicitudObtenerInformacionDeGuiaParaMovimientoEnBodega = ({
  GuiaPedido,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaMovimientoEnBodega/${COOKIE_CON_TOKEN}/${GuiaPedido}`
  );
// PETICIÓN PARA CREAR UN MOVIMIENTO EN BODEGA
export const SolicitudCrearMovimientoEnBodega = (data) =>
  axios.post("/bodega/CrearMovimientoEnBodega", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR TODOS LOS MOVIMIENTOS EN BODEGA POR FILTRO
export const SolicitudBuscarTodosLosMovimientosEnBodegaPorFiltro = (data) =>
  axios.post(
    "/bodega/BuscarTodosLosMovimientosEnBodegaPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR TODOS LOS MOVIMIENTOS EN BODEGA POR FECHA
export const SolicitudBuscarTodosLosMovimientosEnBodegaPorFecha = (data) =>
  axios.post(
    "/bodega/BuscarTodosLosMovimientosEnBodegaPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LOS MOVIMIENTOS EN BODEGA DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFiltro = (
  data
) =>
  axios.post(
    "/bodega/BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LOS MOVIMIENTOS EN BODEGA DE UN BODEGUERO POR FECHA
export const SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFecha = (data) =>
  axios.post(
    "/bodega/BuscarMovimientosEnBodegaDeUnBodegueroPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS DE SALIDA
export const SolicitudObtenerMovimientosDeSalida = () =>
  axios.get(`/bodega/ObtenerMovimientosDeSalida/${COOKIE_CON_TOKEN}`);
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA SALIDAS
export const SolicitudObtenerInformacionDeGuiaParaSalidas = ({
  GuiaPedido,
  idMovimientoSalida,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaSalidas/${COOKIE_CON_TOKEN}/${GuiaPedido}/${idMovimientoSalida}`
  );
// PETICIÓN PARA CREAR UNA SALIDA
export const SolicitudCrearSalida = (data) =>
  axios.post("/bodega/CrearSalida", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR TODAS LAS SALIDAS POR FILTRO
export const SolicitudBuscarTodasLasSalidasABodegaPorFiltro = (data) =>
  axios.post(
    "/bodega/BuscarTodasLasSalidasABodegaPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR TODAS LAS SALIDAS POR FECHA
export const SolicitudBuscarTodasLasSalidasABodegaPorFecha = (data) =>
  axios.post(
    "/bodega/BuscarTodasLasSalidasABodegaPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS SALIDAS DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS SALIDAS DE UN BODEGUERO POR FECHA
export const SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA DEVOLUCION
export const SolicitudObtenerInformacionDeGuiaParaDevolucion = ({
  GuiaPedido,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaDevolucion/${COOKIE_CON_TOKEN}/${GuiaPedido}`
  );
// PETICIÓN PARA CREAR UNA DEVOLUCION
export const SolicitudCrearDevolucion = (data) =>
  axios.post("/bodega/CrearDevolucion", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR TODAS LAS DEVOLUCIONES POR FILTRO
export const SolicitudBuscarTodasLasDevolucionesPorFiltro = (data) =>
  axios.post(
    "/bodega/BuscarTodasLasDevolucionesPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR TODAS LAS DEVOLUCIONES POR FECHA
export const SolicitudBuscarTodasLasDevolucionesPorFecha = (data) =>
  axios.post(
    "/bodega/BuscarTodasLasDevolucionesPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS DEVOLUCIONES DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarDevolucionesDeUnBodegueroPorFiltro = (data) =>
  axios.post(
    "/bodega/BuscarDevolucionesDeUnBodegueroPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LAS DEVOLUCIONES DE UN BODEGUERO POR FECHA
export const SolicitudBuscarDevolucionesDeUnBodegueroPorFecha = (data) =>
  axios.post(
    "/bodega/BuscarDevolucionesDeUnBodegueroPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA ENTRADA A BODEGA
export const SolicitudObtenerPedidosDeUnaEntrada = ({ idEntradaBodega }) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnaEntrada/${COOKIE_CON_TOKEN}/${idEntradaBodega}`
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UN MOVIMIENTO EN BODEGA
export const SolicitudObtenerPedidosDeUnMovimientoEnBodega = ({
  idMovimientoBodega,
}) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnMovimientoEnBodega/${COOKIE_CON_TOKEN}/${idMovimientoBodega}`
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA SALIDA DE BODEGA
export const SolicitudObtenerPedidosDeUnaSalida = ({ idSalidaBodega }) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnaSalida/${COOKIE_CON_TOKEN}/${idSalidaBodega}`
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA DEVOLUCION
export const SolicitudObtenerPedidosDeUnaDevolucion = ({ idDevolucion }) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnaDevolucion/${COOKIE_CON_TOKEN}/${idDevolucion}`
  );
