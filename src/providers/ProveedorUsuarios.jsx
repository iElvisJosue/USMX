/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  SolicitudVerificarTokenUsuario,
  SolicitudIniciarSesionUsuario,
  SolicitudRegistrarUsuario,
  SolicitudBuscarAgenciasQueTieneElUsuario,
  SolicitudBuscarAgenciasQueNoTieneElUsuario,
  SolicitudDesasignarAgenciaAlUsuario,
  SolicitudAsignarAgenciaAlUsuario,
  SolicitudBuscarUsuariosParaAdministrarPorFiltro,
  SolicitudActualizarEstadoUsuario,
  SolicitudActualizarInformacionDeUnUsuario,
  SolicitudCerrarSesionUsuario,
} from "../api/authUsuarios";
import { UsuariosContext } from "../context/UsuariosContext";

export const ProveedorUsuarios = ({ children }) => {
  const [cargandoInfUsuario, establecerCargandoInfUsuario] = useState(true);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [infUsuario, establecerInfUsuario] = useState(null);

  const QuitarValoresDeUsuario = () => {
    establecerInfUsuario(null);
    establecerCargandoInfUsuario(false);
    establecerTieneCookie(false);
  };

  const EstablecerValoresDeUsuario = (res) => {
    establecerInfUsuario(res);
    establecerCargandoInfUsuario(false);
    establecerTieneCookie(true);
    return res;
  };
  useEffect(() => {
    async function ValidarCookie() {
      const cookies = Cookies.get();
      if (!cookies.TOKEN_DE_ACCESO_USMX) {
        console.log("NO HAY COOKIE :(");
        QuitarValoresDeUsuario();
        return;
      }
      try {
        const res = await SolicitudVerificarTokenUsuario({
          TOKEN_DE_ACCESO_USMX: cookies.TOKEN_DE_ACCESO_USMX,
        });
        if (res.data) {
          EstablecerValoresDeUsuario(res.data);
        }
      } catch (err) {
        console.log(err);
        QuitarValoresDeUsuario();
      }
    }
    ValidarCookie();
  }, []);
  const IniciarSesionUsuario = async (data) => {
    try {
      const res = await SolicitudIniciarSesionUsuario(data);
      if (!res.data) {
        return QuitarValoresDeUsuario();
      }
      Cookies.set("TOKEN_DE_ACCESO_USMX", res.data.TOKEN_DE_ACCESO_USMX, {
        expires: 1,
      });
      return EstablecerValoresDeUsuario(res.data);
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
  const CerrarSesionUsuario = async () => {
    try {
      await SolicitudCerrarSesionUsuario();
      return QuitarValoresDeUsuario();
    } catch (error) {
      console.log(error);
      return QuitarValoresDeUsuario();
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        infUsuario,
        tieneCookie,
        cargandoInfUsuario,
        IniciarSesionUsuario,
        RegistrarUsuario,
        BuscarAgenciasQueTieneElUsuario,
        BuscarAgenciasQueNoTieneElUsuario,
        AsignarAgenciaAlUsuario,
        DesasignarAgenciaAlUsuario,
        BuscarUsuariosParaAdministrarPorFiltro,
        ActualizarEstadoUsuario,
        ActualizarInformacionDeUnUsuario,
        CerrarSesionUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
