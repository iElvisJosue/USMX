import axios from "./axios";

// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS DE ENTRADA
export const SolicitudObtenerMovimientosDeEntrada = ({ CookieConToken }) =>
  axios.get(`/bodega/ObtenerMovimientosDeEntrada/${CookieConToken}`);
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA ENTRADAS
export const SolicitudObtenerInformacionDeGuiaParaEntradas = ({
  CookieConToken,
  GuiaPedido,
  idMovimientoEntrada,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaEntradas/${CookieConToken}/${GuiaPedido}/${idMovimientoEntrada}`
  );
// PETICIÓN PARA CREAR UNA ENTRADA
export const SolicitudCrearEntrada = (data) =>
  axios.post("/bodega/CrearEntrada", data);
// PETICIÓN PARA CREAR UNA DEVOLUCION
export const SolicitudCrearDevolucion = (data) =>
  axios.post("/bodega/CrearDevolucion", data);
// PETICIÓN PARA BUSCAR TODAS LAS DEVOLUCIONES POR FILTRO
export const SolicitudBuscarTodasLasEntradasABodegaPorFiltro = (data) =>
  axios.post("/bodega/BuscarTodasLasEntradasABodegaPorFiltro", data);
// PETICIÓN PARA BUSCAR TODAS LAS ENTRADAS A BODEGA POR FECHA
export const SolicitudBuscarTodasLasEntradasABodegaPorFecha = (data) =>
  axios.post("/bodega/BuscarTodasLasEntradasABodegaPorFecha", data);
// PETICIÓN PARA BUSCAR LAS ENTRADAS DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro",
    data
  );
// PETICIÓN PARA BUSCAR LAS ENTRADAS DE UN BODEGUERO POR FECHA
export const SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha",
    data
  );
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA DEVOLUCION
export const SolicitudObtenerInformacionDeGuiaParaDevolucion = ({
  CookieConToken,
  GuiaPedido,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaDevolucion/${CookieConToken}/${GuiaPedido}`
  );
// PETICIÓN PARA BUSCAR TODAS LAS DEVOLUCIONES POR FILTRO
export const SolicitudBuscarTodasLasDevolucionesPorFiltro = (data) =>
  axios.post("/bodega/BuscarTodasLasDevolucionesPorFiltro", data);
// PETICIÓN PARA BUSCAR TODAS LAS DEVOLUCIONES POR FECHA
export const SolicitudBuscarTodasLasDevolucionesPorFecha = (data) =>
  axios.post("/bodega/BuscarTodasLasDevolucionesPorFecha", data);
// PETICIÓN PARA BUSCAR LAS DEVOLUCIONES DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarDevolucionesDeUnBodegueroPorFiltro = (data) =>
  axios.post("/bodega/BuscarDevolucionesDeUnBodegueroPorFiltro", data);
// PETICIÓN PARA BUSCAR LAS DEVOLUCIONES DE UN BODEGUERO POR FECHA
export const SolicitudBuscarDevolucionesDeUnBodegueroPorFecha = (data) =>
  axios.post("/bodega/BuscarDevolucionesDeUnBodegueroPorFecha", data);
// PETICIÓN PARA CREAR UN MOVIMIENTO EN BODEGA
export const SolicitudCrearMovimientoEnBodega = (data) =>
  axios.post("/bodega/CrearMovimientoEnBodega", data);
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA MOVIMIENTO EN BODEGA
export const SolicitudObtenerInformacionDeGuiaParaMovimientoEnBodega = ({
  CookieConToken,
  GuiaPedido,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaMovimientoEnBodega/${CookieConToken}/${GuiaPedido}`
  );

// PETICIÓN PARA BUSCAR TODOS LOS MOVIMIENTOS EN BODEGA POR FILTRO
export const SolicitudBuscarTodosLosMovimientosEnBodegaPorFiltro = (data) =>
  axios.post("/bodega/BuscarTodosLosMovimientosEnBodegaPorFiltro", data);
// PETICIÓN PARA BUSCAR TODOS LOS MOVIMIENTOS EN BODEGA POR FECHA
export const SolicitudBuscarTodosLosMovimientosEnBodegaPorFecha = (data) =>
  axios.post("/bodega/BuscarTodosLosMovimientosEnBodegaPorFecha", data);
// PETICIÓN PARA BUSCAR LOS MOVIMIENTOS EN BODEGA DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFiltro = (
  data
) =>
  axios.post("/bodega/BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro", data);
// PETICIÓN PARA BUSCAR LOS MOVIMIENTOS EN BODEGA DE UN BODEGUERO POR FECHA
export const SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFecha = (data) =>
  axios.post("/bodega/BuscarMovimientosEnBodegaDeUnBodegueroPorFecha", data);
// PETICIÓN PARA OBTENER TODOS LOS MOVIMIENTOS DE SALIDA
export const SolicitudObtenerMovimientosDeSalida = ({ CookieConToken }) =>
  axios.get(`/bodega/ObtenerMovimientosDeSalida/${CookieConToken}`);
// PETICIÓN PARA OBTENER LA INFORMACIÓN DE UNA GUIA PARA SALIDAS
export const SolicitudObtenerInformacionDeGuiaParaSalidas = ({
  CookieConToken,
  GuiaPedido,
  idMovimientoSalida,
}) =>
  axios.get(
    `/bodega/ObtenerInformacionDeGuiaParaSalidas/${CookieConToken}/${GuiaPedido}/${idMovimientoSalida}`
  );
// PETICIÓN PARA CREAR UNA SALIDA
export const SolicitudCrearSalida = (data) =>
  axios.post("/bodega/CrearSalida", data);
// PETICIÓN PARA BUSCAR TODAS LAS SALIDAS POR FILTRO
export const SolicitudBuscarTodasLasSalidasABodegaPorFiltro = (data) =>
  axios.post("/bodega/BuscarTodasLasSalidasABodegaPorFiltro", data);
// PETICIÓN PARA BUSCAR TODAS LAS SALIDAS POR FECHA
export const SolicitudBuscarTodasLasSalidasABodegaPorFecha = (data) =>
  axios.post("/bodega/BuscarTodasLasSalidasABodegaPorFecha", data);
// PETICIÓN PARA BUSCAR LAS SALIDAS DE UN BODEGUERO POR FILTRO
export const SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro = (
  data
) =>
  axios.post(
    "/bodega/BuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro",
    data
  );
// PETICIÓN PARA BUSCAR LAS SALIDAS DE UN BODEGUERO POR FECHA
export const SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha = (
  data
) =>
  axios.post("/bodega/BuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha", data);
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA ENTRADA A BODEGA
export const SolicitudObtenerPedidosDeUnaEntrada = ({
  CookieConToken,
  idEntradaBodega,
}) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnaEntrada/${CookieConToken}/${idEntradaBodega}`
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UN MOVIMIENTO EN BODEGA
export const SolicitudObtenerPedidosDeUnMovimientoEnBodega = ({
  CookieConToken,
  idMovimientoBodega,
}) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnMovimientoEnBodega/${CookieConToken}/${idMovimientoBodega}`
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA SALIDA DE BODEGA
export const SolicitudObtenerPedidosDeUnaSalida = ({
  CookieConToken,
  idSalidaBodega,
}) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnaSalida/${CookieConToken}/${idSalidaBodega}`
  );
// PETICIÓN PARA OBTENER LOS PEDIDOS DE UNA DEVOLUCION
export const SolicitudObtenerPedidosDeUnaDevolucion = ({
  CookieConToken,
  idDevolucion,
}) =>
  axios.get(
    `/bodega/ObtenerPedidosDeUnaDevolucion/${CookieConToken}/${idDevolucion}`
  );
