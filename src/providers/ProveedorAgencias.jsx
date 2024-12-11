/* eslint-disable react/prop-types */
import {
  SolicitudRegistrarAgencia,
  SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario,
  SolicitudBuscarProductosQueTieneLaAgencia,
  SolicitudBuscarProductosQueNoTieneLaAgencia,
  SolicitudAsignarProductoAgencia,
  SolicitudActualizarProductoAgencia,
  SolicitudDesasignarProductoAgencia,
  SolicitudActualizarEstadoAgencia,
  SolicitudActualizarInformacionAgencia,
  SolicitudBuscarAgenciasPorFiltro,
  SolicitudCrearYDescargarExcelDeAgencias,
  SolicitudSubirArchivoRemitentes,
  SolicitudSubirArchivoDestinatarios,
} from "../api/authAgencias";
import { AgenciasContext } from "../context/AgenciasContext";

export const ProveedorAgencias = ({ children }) => {
  const RegistrarAgencia = async (data) => {
    try {
      const res = await SolicitudRegistrarAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarAgenciasPorFiltroYTipoDeUsuario = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarProductosQueTieneLaAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarProductosQueTieneLaAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarProductosQueNoTieneLaAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarProductosQueNoTieneLaAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const AsignarProductoAgencia = async (data) => {
    try {
      const res = await SolicitudAsignarProductoAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarProductoAgencia = async (data) => {
    try {
      const res = await SolicitudActualizarProductoAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const DesasignarProductoAgencia = async (data) => {
    try {
      const res = await SolicitudDesasignarProductoAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarEstadoAgencia = async (data) => {
    try {
      const res = await SolicitudActualizarEstadoAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const ActualizarInformacionAgencia = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarAgenciasPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const CrearYDescargarExcelDeAgencias = async (data) => {
    try {
      const res = await SolicitudCrearYDescargarExcelDeAgencias(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const SubirArchivoRemitentes = async (data) => {
    try {
      const res = await SolicitudSubirArchivoRemitentes(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const SubirArchivoDestinatarios = async (data) => {
    try {
      const res = await SolicitudSubirArchivoDestinatarios(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <AgenciasContext.Provider
      value={{
        RegistrarAgencia,
        BuscarAgenciasPorFiltroYTipoDeUsuario,
        BuscarProductosQueTieneLaAgencia,
        BuscarProductosQueNoTieneLaAgencia,
        AsignarProductoAgencia,
        ActualizarProductoAgencia,
        DesasignarProductoAgencia,
        ActualizarEstadoAgencia,
        ActualizarInformacionAgencia,
        BuscarAgenciasPorFiltro,
        CrearYDescargarExcelDeAgencias,
        SubirArchivoRemitentes,
        SubirArchivoDestinatarios,
      }}
    >
      {children}
    </AgenciasContext.Provider>
  );
};
