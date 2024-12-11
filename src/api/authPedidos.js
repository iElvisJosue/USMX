import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// PETICIÓN PARA REGISTRAR GUARDAR LA INFORMACIÓN DEL REMITENTE, DESTINATARIO Y PEDIDO
export const SolicitudGuardarTodaLaInformacion = (data) =>
  axios.post("/pedidos/GuardarTodaLaInformacion", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR TODOS LOS PEDIDOS POR FILTRO
export const SolicitudBuscarTodosLosPedidosPorFiltro = (data) =>
  axios.post(
    "/pedidos/BuscarTodosLosPedidosPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR TODOS LOS PEDIDOS POR FECHA
export const SolicitudBuscarTodosLosPedidosPorFecha = (data) =>
  axios.post(
    "/pedidos/BuscarTodosLosPedidosPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LOS PEDIDOS DE UN USUARIO POR FILTRO
export const SolicitudBuscarPedidosDeUnUsuarioPorFiltro = (data) =>
  axios.post(
    "/pedidos/BuscarPedidosDeUnUsuarioPorFiltro",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LOS PEDIDOS DE UN USUARIO POR FECHA
export const SolicitudBuscarPedidosDeUnUsuarioPorFecha = (data) =>
  axios.post(
    "/pedidos/BuscarPedidosDeUnUsuarioPorFecha",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR PEDIDOS POR PAQUETE
export const SolicitudBuscarPedidosPorPaquete = (data) =>
  axios.post("/pedidos/BuscarPedidosPorPaquete", AgregarCookiePeticion(data));
// PETICIÓN PARA BUSCAR LOS REMITENTES POR AGENCIA
export const SolicitudBuscarRemitentesPorAgencia = (data) =>
  axios.post(
    "/pedidos/BuscarRemitentesPorAgencia",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LOS DESTINATARIOS POR AGENCIA
export const SolicitudBuscarDestinatariosPorAgencia = (data) =>
  axios.post(
    "/pedidos/BuscarDestinatariosPorAgencia",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR LOS ÚLTIMOS 10 PEDIDOS GENERALES
export const SolicitudBuscarUltimosDiezPedidosGenerales = () =>
  axios.get("/pedidos/BuscarUltimosDiezPedidosGenerales");
// PETICIÓN PARA BUSCAR LOS ÚLTIMOS 10 PEDIDOS REALIZADO DE UN USUARIO
export const SolicitudBuscarUltimosDiezPedidosDeUnUsuario = ({ idUsuario }) =>
  axios.get(`/pedidos/BuscarUltimosDiezPedidosDeUnUsuario/${idUsuario}`);
// PETICIÓN PARA BUSCAR LOS MOVIMIENTOS DE UN PEDIDO
export const SolicitudBuscarMovimientosDeUnPedido = (data) =>
  axios.post(
    "/pedidos/BuscarMovimientosDeUnPedido",
    AgregarCookiePeticion(data)
  );
// PETICIÓN PARA BUSCAR PEDIDOS POR NUMERO DE GUIA
export const SolicitudBuscarPedidoPorNumeroDeGuia = (GuiaPedido) =>
  axios.get(`/pedidos/BuscarPedidoPorNumeroDeGuia/${GuiaPedido}`);
