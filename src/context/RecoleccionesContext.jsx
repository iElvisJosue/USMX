/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudCrearRecoleccion,
  SolicitudObtenerInformacionDeGuia,
  SolicitudBuscarTodasLasRecoleccionesPorFiltro,
  SolicitudBuscarTodasLasRecoleccionesPorFecha,
  SolicitudBuscarRecoleccionesDeUnChoferPorFiltro,
  SolicitudBuscarRecoleccionesDeUnChoferPorFecha,
} from "../api/authRecolecciones";

export const RecoleccionesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useRecolecciones = () => {
  const context = useContext(RecoleccionesContext);
  if (!context) {
    throw new Error(
      "useRecolecciones debería ser usado dentro de Proveedor recolecciones"
    );
  }
  return context;
};
export const ProveedorRecolecciones = ({ children }) => {
  const CrearRecoleccion = async (data) => {
    try {
      const res = await SolicitudCrearRecoleccion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerInformacionDeGuia = async (data) => {
    try {
      const res = await SolicitudObtenerInformacionDeGuia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasRecoleccionesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasRecoleccionesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasRecoleccionesPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasRecoleccionesPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarRecoleccionesDeUnChoferPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarRecoleccionesDeUnChoferPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarRecoleccionesDeUnChoferPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarRecoleccionesDeUnChoferPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <RecoleccionesContext.Provider
      value={{
        CrearRecoleccion,
        ObtenerInformacionDeGuia,
        BuscarTodasLasRecoleccionesPorFiltro,
        BuscarTodasLasRecoleccionesPorFecha,
        BuscarRecoleccionesDeUnChoferPorFiltro,
        BuscarRecoleccionesDeUnChoferPorFecha,
      }}
    >
      {children}
    </RecoleccionesContext.Provider>
  );
};
