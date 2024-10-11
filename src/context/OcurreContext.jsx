/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarOcurre,
  SolicitudBuscarOcurresPorFiltro,
  SolicitudActualizarEstadoOcurre,
  SolicitudActualizarInformacionOcurre,
} from "../api/authOcurre";

export const OcurreContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useOcurre = () => {
  const context = useContext(OcurreContext);
  if (!context) {
    throw new Error("useOcurre debería ser usado dentro de Proveedor ocurre");
  }
  return context;
};
export const ProveedorOcurre = ({ children }) => {
  const RegistrarOcurre = async (data) => {
    try {
      const res = await SolicitudRegistrarOcurre(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarOcurresPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarOcurresPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarEstadoOcurre = async (data) => {
    try {
      const res = await SolicitudActualizarEstadoOcurre(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarInformacionOcurre = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionOcurre(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <OcurreContext.Provider
      value={{
        RegistrarOcurre,
        BuscarOcurresPorFiltro,
        ActualizarEstadoOcurre,
        ActualizarInformacionOcurre,
      }}
    >
      {children}
    </OcurreContext.Provider>
  );
};
