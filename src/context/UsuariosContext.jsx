/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarUsuario,
  SolicitudBuscarUsuariosPorFiltro,
  SolicitudBuscarAgenciasQueTieneElUsuario,
  SolicitudBuscarAgenciasQueNoTieneElUsuario,
  SolicitudDesasignarAgenciaAlUsuario,
  SolicitudAsignarAgenciaAlUsuario,
} from "../api/authUsuarios";

export const UsuariosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error(
      "useUsuarios debería ser usado dentro de Proveedor usuarios"
    );
  }
  return context;
};
export const ProveedorUsuarios = ({ children }) => {
  const RegistrarUsuario = async (data) => {
    try {
      const res = await SolicitudRegistrarUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarUsuariosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarUsuariosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarAgenciasQueTieneElUsuario = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasQueTieneElUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarAgenciasQueNoTieneElUsuario = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasQueNoTieneElUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const AsignarAgenciaAlUsuario = async (data) => {
    try {
      const res = await SolicitudAsignarAgenciaAlUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const DesasignarAgenciaAlUsuario = async (data) => {
    try {
      const res = await SolicitudDesasignarAgenciaAlUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <UsuariosContext.Provider
      value={{
        RegistrarUsuario,
        BuscarUsuariosPorFiltro,
        BuscarAgenciasQueTieneElUsuario,
        BuscarAgenciasQueNoTieneElUsuario,
        AsignarAgenciaAlUsuario,
        DesasignarAgenciaAlUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
