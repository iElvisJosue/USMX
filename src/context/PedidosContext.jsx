/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudGuardarTodaLaInformacion,
  SolicitudBuscarPedidosPorFiltro,
  SolicitudBuscarPedidosPorPaquete,
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
  const BuscarPedidosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosPorFiltro(data);
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

  return (
    <PedidosContext.Provider
      value={{
        GuardarTodaLaInformacion,
        BuscarPedidosPorFiltro,
        BuscarPedidosPorPaquete,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
