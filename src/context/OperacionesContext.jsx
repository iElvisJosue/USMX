/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarMovimiento,
  SolicitudObtenerTodosLosMovimientos,
  SolicitudActualizarEstadoDeUnMovimiento,
  SolicitudEditarMovimiento,
  SolicitudObtenerPaisesActivos,
  SolicitudObtenerEstadosPorCodigoDelPais,
  SolicitudObtenerCiudadesPorEstado,
  SolicitudObtenerColoniasPorCodigoPostal,
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
  const ObtenerPaisesActivos = async (data) => {
    try {
      const res = await SolicitudObtenerPaisesActivos(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerEstadosPorCodigoDelPais = async (data) => {
    try {
      const res = await SolicitudObtenerEstadosPorCodigoDelPais(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerCiudadesPorEstado = async (data) => {
    try {
      const res = await SolicitudObtenerCiudadesPorEstado(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerColoniasPorCodigoPostal = async (data) => {
    try {
      const res = await SolicitudObtenerColoniasPorCodigoPostal(data);
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
        ObtenerPaisesActivos,
        ObtenerEstadosPorCodigoDelPais,
        ObtenerCiudadesPorEstado,
        ObtenerColoniasPorCodigoPostal,
      }}
    >
      {children}
    </OperacionesContext.Provider>
  );
};
