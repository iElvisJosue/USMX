/* eslint-disable react/prop-types */
import {
  SolicitudRegistrarOcurre,
  SolicitudBuscarOcurresPorFiltro,
  SolicitudActualizarEstadoOcurre,
  SolicitudActualizarInformacionOcurre,
  SolicitudBuscarOcurresActivosPorFiltro,
} from "../api/authOcurre";
import { OcurreContext } from "../context/OcurreContext";

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
  const BuscarOcurresActivosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarOcurresActivosPorFiltro(data);
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
        BuscarOcurresActivosPorFiltro,
      }}
    >
      {children}
    </OcurreContext.Provider>
  );
};
