/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarMovimiento,
  SolicitudObtenerTodosLosMovimientos,
  SolicitudActualizarEstadoDeUnMovimiento,
  SolicitudEditarMovimiento,
} from "../api/authOperaciones";

export const OperacionesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useOperaciones = () => {
  const context = useContext(OperacionesContext);
  if (!context) {
    throw new Error(
      "useOperaciones debería ser usado dentro de Proveedor operaciones"
    );
  }
  return context;
};
export const ProveedorOperaciones = ({ children }) => {
  const RegistrarMovimiento = async (data) => {
    try {
      const res = await SolicitudRegistrarMovimiento(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerTodosLosMovimientos = async (data) => {
    try {
      const res = await SolicitudObtenerTodosLosMovimientos(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const ActualizarEstadoDeUnMovimiento = async (data) => {
    try {
      const res = await SolicitudActualizarEstadoDeUnMovimiento(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EditarMovimiento = async (data) => {
    try {
      const res = await SolicitudEditarMovimiento(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <OperacionesContext.Provider
      value={{
        RegistrarMovimiento,
        ObtenerTodosLosMovimientos,
        ActualizarEstadoDeUnMovimiento,
        EditarMovimiento,
      }}
    >
      {children}
    </OperacionesContext.Provider>
  );
};
