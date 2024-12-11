/* eslint-disable react/prop-types */
import {
  SolicitudRegistrarMovimiento,
  SolicitudObtenerTodosLosMovimientos,
  SolicitudActualizarEstadoDeUnMovimiento,
  SolicitudEditarMovimiento,
} from "../api/authOperaciones";
import { OperacionesContext } from "../context/OperacionesContext";

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
