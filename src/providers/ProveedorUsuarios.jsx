/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import {
  SolicitudIniciarSesionUsuario,
  SolicitudActualizarFotoUsuario,
  SolicitudActualizarInformacionPersonalUsuario,
  SolicitudActualizarContraseñaUsuario,
  SolicitudRegistrarUsuario,
  SolicitudBuscarAgenciasQueTieneElUsuario,
  SolicitudBuscarAgenciasQueNoTieneElUsuario,
  SolicitudDesasignarAgenciaAlUsuario,
  SolicitudAsignarAgenciaAlUsuario,
  SolicitudBuscarUsuariosParaAdministrarPorFiltro,
  SolicitudActualizarEstadoUsuario,
  SolicitudActualizarInformacionDeUnUsuario,
} from "../api/authUsuarios";
import { UsuariosContext } from "../context/UsuariosContext";

export const ProveedorUsuarios = ({ children }) => {
  const IniciarSesionUsuario = async (data) => {
    try {
      const res = await SolicitudIniciarSesionUsuario(data);
      if (res.data) {
        Cookies.set("TOKEN_DE_ACCESO_USMX", res.data, {
          expires: 1,
        });
        return res.data;
      }
    } catch (error) {
      return error;
    }
  };
  const ActualizarFotoUsuario = async (data) => {
    try {
      const res = await SolicitudActualizarFotoUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarInformacionPersonalUsuario = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionPersonalUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarContraseñaUsuario = async (data) => {
    try {
      const res = await SolicitudActualizarContraseñaUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const RegistrarUsuario = async (data) => {
    try {
      const res = await SolicitudRegistrarUsuario(data);
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
  const BuscarUsuariosParaAdministrarPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarUsuariosParaAdministrarPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarEstadoUsuario = async (data) => {
    try {
      const res = await SolicitudActualizarEstadoUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarInformacionDeUnUsuario = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionDeUnUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        IniciarSesionUsuario,
        ActualizarFotoUsuario,
        ActualizarInformacionPersonalUsuario,
        ActualizarContraseñaUsuario,
        RegistrarUsuario,
        BuscarAgenciasQueTieneElUsuario,
        BuscarAgenciasQueNoTieneElUsuario,
        AsignarAgenciaAlUsuario,
        DesasignarAgenciaAlUsuario,
        BuscarUsuariosParaAdministrarPorFiltro,
        ActualizarEstadoUsuario,
        ActualizarInformacionDeUnUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
