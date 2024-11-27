/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudGuardarTodaLaInformacion,
  SolicitudBuscarTodosLosPedidosPorFiltro,
  SolicitudBuscarTodosLosPedidosPorFecha,
  SolicitudBuscarPedidosDeUnUsuarioPorFiltro,
  SolicitudBuscarPedidosDeUnUsuarioPorFecha,
  SolicitudBuscarPedidosPorPaquete,
  SolicitudBuscarRemitentesPorAgencia,
  SolicitudBuscarDestinatariosPorAgencia,
  SolicitudBuscarUltimosDiezPedidosGenerales,
  SolicitudBuscarUltimosDiezPedidosDeUnUsuario,
  SolicitudBuscarMovimientosDeUnPedido,
  SolicitudBuscarPedidoPorNumeroDeGuia,
} from "../api/authPedidos";

export const PedidosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos debería ser usado dentro de Proveedor pedidos");
  }
  return context;
};
export const ProveedorPedidos = ({ children }) => {
  const GuardarTodaLaInformacion = async (data) => {
    try {
      const res = await SolicitudGuardarTodaLaInformacion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodosLosPedidosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarTodosLosPedidosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodosLosPedidosPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarTodosLosPedidosPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidosDeUnUsuarioPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosDeUnUsuarioPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidosDeUnUsuarioPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosDeUnUsuarioPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidosPorPaquete = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosPorPaquete(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarRemitentesPorAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarRemitentesPorAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarDestinatariosPorAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarDestinatariosPorAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarUltimosDiezPedidosGenerales = async () => {
    try {
      const res = await SolicitudBuscarUltimosDiezPedidosGenerales();
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarUltimosDiezPedidosDeUnUsuario = async (data) => {
    try {
      const res = await SolicitudBuscarUltimosDiezPedidosDeUnUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarMovimientosDeUnPedido = async (data) => {
    try {
      const res = await SolicitudBuscarMovimientosDeUnPedido(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidoPorNumeroDeGuia = async (data) => {
    try {
      const res = await SolicitudBuscarPedidoPorNumeroDeGuia(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        GuardarTodaLaInformacion,
        BuscarTodosLosPedidosPorFiltro,
        BuscarTodosLosPedidosPorFecha,
        BuscarPedidosDeUnUsuarioPorFiltro,
        BuscarPedidosDeUnUsuarioPorFecha,
        BuscarPedidosPorPaquete,
        BuscarRemitentesPorAgencia,
        BuscarDestinatariosPorAgencia,
        BuscarUltimosDiezPedidosGenerales,
        BuscarUltimosDiezPedidosDeUnUsuario,
        BuscarMovimientosDeUnPedido,
        BuscarPedidoPorNumeroDeGuia,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
