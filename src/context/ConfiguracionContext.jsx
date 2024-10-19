/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  SolicitudObtenerTiposDeCarga,
  SolicitudObtenerTiposDeEnvio,
  SolicitudObtenerModoOscuro,
  SolicitudActualizarModoOscuro,
  SolicitudRegistrarTipoDeCarga,
  SolicitudEliminarTipoDeCarga,
  SolicitudRegistrarTipoDeEnvio,
  SolicitudEliminarTipoDeEnvio,
  SolicitudBuscarPaisesPorFiltro,
  SolicitudBuscarEstadosPorFiltro,
  SolicitudBuscarCiudadesPorFiltro,
  SolicitudBuscarColoniasPorFiltro,
} from "../api/authConfiguracion";
import { useGlobal } from "./GlobalContext";

export const ConfiguracionContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConfiguracion = () => {
  const context = useContext(ConfiguracionContext);
  if (!context) {
    throw new Error(
      "useConfiguracion debería ser usado dentro de Proveedor configuracion"
    );
  }
  return context;
};
export const ProveedorConfiguracion = ({ children }) => {
  const [obtenerModoOscuro, establecerObtenerModoOscuro] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const { usuario } = useGlobal();

  // OBTENER MODO OSCURO
  useEffect(() => {
    async function ObtenerModoOscuro() {
      if (usuario) {
        const res = await SolicitudObtenerModoOscuro(usuario.idUsuario);
        if (!res.data) {
          return console.log("Error al obtener el modo oscuro");
        } else {
          const { ModoOscuro } = res.data[0];
          setModoOscuro(ModoOscuro);
          document.documentElement.style.setProperty(
            "--ColorPrincipal",
            `${ModoOscuro ? "#e7e8ed" : "#171616"}`
          );
          document.documentElement.style.setProperty(
            "--ColorSecundario",
            `${ModoOscuro ? "#2c2c2c" : "#e7e8ed"}`
          );
          document.documentElement.style.setProperty(
            "--ColorNegro",
            `${ModoOscuro ? "#ffffff" : "#171616"}`
          );
          document.documentElement.style.setProperty(
            "--ColorBlanco",
            `${ModoOscuro ? "#171616" : "#ffffff"}`
          );
          document.documentElement.style.setProperty(
            "--ColorGris",
            `${ModoOscuro ? "#d4d5da" : "gray"}`
          );
          document.documentElement.style.setProperty(
            "--ColorGrisClaro",
            `${ModoOscuro ? "gray" : "#d4d5da"}`
          );
        }
      }
    }
    ObtenerModoOscuro();
  }, [usuario, obtenerModoOscuro]);

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
  const ActualizarModoOscuro = async (data) => {
    try {
      const res = await SolicitudActualizarModoOscuro(data);
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
  const BuscarPaisesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarPaisesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarEstadosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarEstadosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarCiudadesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarCiudadesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarColoniasPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarColoniasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ConfiguracionContext.Provider
      value={{
        modoOscuro,
        obtenerModoOscuro,
        establecerObtenerModoOscuro,
        ObtenerTiposDeCarga,
        ObtenerTiposDeEnvio,
        ActualizarModoOscuro,
        RegistrarTipoDeCarga,
        EliminarTipoDeCarga,
        RegistrarTipoDeEnvio,
        EliminarTipoDeEnvio,
        BuscarPaisesPorFiltro,
        BuscarEstadosPorFiltro,
        BuscarCiudadesPorFiltro,
        BuscarColoniasPorFiltro,
      }}
    >
      {children}
    </ConfiguracionContext.Provider>
  );
};
