/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  SolicitudObtenerModoOscuro,
  SolicitudActualizarModoOscuro,
  SolicitudObtenerIdioma,
  SolicitudActualizarIdioma,
  SolicitudObtenerTiposDeCarga,
  SolicitudObtenerTiposDeEnvio,
  SolicitudRegistrarTipoDeCarga,
  SolicitudEliminarTipoDeCarga,
  SolicitudRegistrarTipoDeEnvio,
  SolicitudEliminarTipoDeEnvio,
  SolicitudObtenerApiGoogleMapsAutoCompletado,
} from "../api/authConfiguracion";
import { ConfiguracionContext } from "../context/ConfiguracionContext";
import { useUsuarios } from "../context/UsuariosContext";

export const ProveedorConfiguracion = ({ children }) => {
  const [obtenerModoOscuro, establecerObtenerModoOscuro] = useState(false);
  const [modoOscuro, establecerModoOscuro] = useState(false);
  const [obtenerIdioma, establecerObtenerIdioma] = useState(false);
  const [idioma, establecerIdioma] = useState("es");
  const { infUsuario } = useUsuarios();

  // OBTENER MODO OSCURO
  useEffect(() => {
    async function ObtenerModoOscuro() {
      if (infUsuario) {
        const res = await SolicitudObtenerModoOscuro(infUsuario.idUsuario);
        if (!res.data) {
          return console.log("Error al obtener el modo oscuro");
        } else {
          const { ModoOscuro } = res.data[0];
          establecerModoOscuro(ModoOscuro);
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
  }, [infUsuario, obtenerModoOscuro]);

  // OBTENER IDIOMA
  useEffect(() => {
    async function ObtenerIdioma() {
      if (infUsuario) {
        const res = await SolicitudObtenerIdioma(infUsuario.idUsuario);
        if (!res.data) {
          return console.log("Error al obtener el idioma");
        } else {
          const { Idioma } = res.data[0];
          establecerIdioma(Idioma);
        }
      }
    }
    ObtenerIdioma();
  }, [infUsuario, obtenerIdioma]);

  const ActualizarModoOscuro = async (data) => {
    try {
      const res = await SolicitudActualizarModoOscuro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarIdioma = async (data) => {
    try {
      const res = await SolicitudActualizarIdioma(data);
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
    <ConfiguracionContext.Provider
      value={{
        modoOscuro,
        ActualizarModoOscuro,
        obtenerModoOscuro,
        establecerObtenerModoOscuro,
        idioma,
        ActualizarIdioma,
        obtenerIdioma,
        establecerObtenerIdioma,
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
