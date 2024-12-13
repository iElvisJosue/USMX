/* eslint-disable react/prop-types */
import {
  SolicitudObtenerTiposDeCarga,
  SolicitudObtenerTiposDeEnvio,
  SolicitudRegistrarTipoDeCarga,
  SolicitudEliminarTipoDeCarga,
  SolicitudRegistrarTipoDeEnvio,
  SolicitudEliminarTipoDeEnvio,
  SolicitudObtenerApiGoogleMapsAutoCompletado,
} from "../api/authConfiguracion";
import { ConfiguracionContext } from "../context/ConfiguracionContext";

export const ProveedorConfiguracion = ({ children }) => {
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
    <ConfiguracionContext.Provider
      value={{
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
    </ConfiguracionContext.Provider>
  );
};
