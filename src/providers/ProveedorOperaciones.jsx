/* eslint-disable react/prop-types */
import {
  SolicitudObtenerTodosLosMovimientos,
  SolicitudRegistrarMovimiento,
  SolicitudActualizarEstadoDeUnMovimiento,
  SolicitudEditarMovimiento,
  SolicitudObtenerTiposDeCarga,
  SolicitudObtenerTiposDeEnvio,
  SolicitudRegistrarTipoDeCarga,
  SolicitudEliminarTipoDeCarga,
  SolicitudRegistrarTipoDeEnvio,
  SolicitudEliminarTipoDeEnvio,
  SolicitudObtenerApiGoogleMapsAutoCompletado,
} from "../api/authOperaciones";
import { OperacionesContext } from "../context/OperacionesContext";

export const ProveedorOperaciones = ({ children }) => {
  const ObtenerTodosLosMovimientos = async (data) => {
    try {
      const res = await SolicitudObtenerTodosLosMovimientos(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const RegistrarMovimiento = async (data) => {
    try {
      const res = await SolicitudRegistrarMovimiento(data);
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
  const ObtenerTiposDeCarga = async (data) => {
    try {
      const res = await SolicitudObtenerTiposDeCarga(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerTiposDeEnvio = async (data) => {
    try {
      const res = await SolicitudObtenerTiposDeEnvio(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const RegistrarTipoDeCarga = async (data) => {
    try {
      const res = await SolicitudRegistrarTipoDeCarga(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EliminarTipoDeCarga = async (data) => {
    try {
      const res = await SolicitudEliminarTipoDeCarga(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const RegistrarTipoDeEnvio = async (data) => {
    try {
      const res = await SolicitudRegistrarTipoDeEnvio(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EliminarTipoDeEnvio = async (data) => {
    try {
      const res = await SolicitudEliminarTipoDeEnvio(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerApiGoogleMapsAutoCompletado = async () => {
    try {
      const res = await SolicitudObtenerApiGoogleMapsAutoCompletado();
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
        ObtenerTiposDeCarga,
        ObtenerTiposDeEnvio,
        RegistrarTipoDeCarga,
        EliminarTipoDeCarga,
        RegistrarTipoDeEnvio,
        EliminarTipoDeEnvio,
        ObtenerApiGoogleMapsAutoCompletado,
      }}
    >
      {children}
    </OperacionesContext.Provider>
  );
};
