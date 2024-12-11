/* eslint-disable react/prop-types */
import {
  SolicitudCrearRecoleccion,
  SolicitudObtenerInformacionDeGuia,
  SolicitudBuscarTodasLasRecoleccionesPorFiltro,
  SolicitudBuscarTodasLasRecoleccionesPorFecha,
  SolicitudBuscarRecoleccionesDeUnChoferPorFiltro,
  SolicitudBuscarRecoleccionesDeUnChoferPorFecha,
  SolicitudObtenerPedidosDeUnaRecoleccion,
} from "../api/authRecolecciones";
import { RecoleccionesContext } from "../context/RecoleccionesContext";
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
  const ObtenerPedidosDeUnaRecoleccion = async (data) => {
    try {
      const res = await SolicitudObtenerPedidosDeUnaRecoleccion(data);
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
        ObtenerPedidosDeUnaRecoleccion,
      }}
    >
      {children}
    </RecoleccionesContext.Provider>
  );
};
