/* eslint-disable react/prop-types */
import {
  SolicitudRegistrarProducto,
  SolicitudObtenerProductosPorAgencia,
  SolicitudBuscarProductosPorFiltro,
  SolicitudBuscarAgenciasQueTieneUnProducto,
  SolicitudBuscarAgenciasQueNoTieneUnProducto,
  SolicitudAsignarAgenciaAlProducto,
  SolicitudDesasignarAgenciaAlProducto,
  SolicitudActualizarInformacionDeUnProducto,
  SolicitudActualizarEstadoProducto,
} from "../api/authProductos";
import { ProductosContext } from "../context/ProductosContext";

export const ProveedorProductos = ({ children }) => {
  const RegistrarProducto = async (data) => {
    try {
      const res = await SolicitudRegistrarProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerProductosPorAgencia = async (data) => {
    try {
      const res = await SolicitudObtenerProductosPorAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarProductosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarProductosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarAgenciasQueTieneUnProducto = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasQueTieneUnProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarAgenciasQueNoTieneUnProducto = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasQueNoTieneUnProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const AsignarAgenciaAlProducto = async (data) => {
    try {
      const res = await SolicitudAsignarAgenciaAlProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const DesasignarAgenciaAlProducto = async (data) => {
    try {
      const res = await SolicitudDesasignarAgenciaAlProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarInformacionDeUnProducto = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionDeUnProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarEstadoDeUnProducto = async (data) => {
    try {
      const res = await SolicitudActualizarEstadoProducto(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        RegistrarProducto,
        ObtenerProductosPorAgencia,
        BuscarProductosPorFiltro,
        BuscarAgenciasQueTieneUnProducto,
        BuscarAgenciasQueNoTieneUnProducto,
        AsignarAgenciaAlProducto,
        DesasignarAgenciaAlProducto,
        ActualizarInformacionDeUnProducto,
        ActualizarEstadoDeUnProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
