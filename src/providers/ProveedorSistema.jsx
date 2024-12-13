/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  SolicitudObtenerNombreYLogoDelSistema,
  SolicitudActualizarModoOscuro,
  SolicitudActualizarIdioma,
  SolicitudVerificarToken,
  SolicitudActualizarLogoSistema,
  SolicitudActualizarInformacionDelSistema,
  SolicitudObtenerResumenDiario,
  SolicitudCerrarSesion,
} from "../api/authSistema";
import { SistemaContext } from "../context/SistemaContext";
// IMPORTAMOS LAS AYUDAS
import { ColocarIconoYNombreDelSitio } from "../helpers/EstablecerLogoYNombreDelSistema";

export const ProveedorSistema = ({ children }) => {
  const [infSistema, establecerInfSistema] = useState(null);
  const [infUsuario, establecerInfUsuario] = useState(null);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [cargandoInformacion, establecerCargandoInformacion] = useState(true);
  const [obtenerInformacionNuevamente, establecerObtenerInformacionNuevamente] =
    useState(false);

  const QuitarInformacionAlmacenada = () => {
    establecerInfUsuario(null);
    establecerInfSistema(null);
    establecerTieneCookie(false);
    establecerCargandoInformacion(false);
  };

  const EstablecerInformacionObtenida = (res) => {
    const { InformacionSistema, InformacionUsuario } = res;
    ColocarIconoYNombreDelSitio(
      InformacionSistema.LogoSistema,
      InformacionSistema.NombreSistema
    );
    establecerInfSistema(InformacionSistema);
    establecerInfUsuario(InformacionUsuario);
    establecerTieneCookie(true);
    establecerCargandoInformacion(false);
    return res;
  };

  // VALIDAMOS SU TOKEN CADA MINUTO
  setInterval(() => {
    establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
  }, 60000);

  useEffect(() => {
    ValidarCookie();
  }, [obtenerInformacionNuevamente]);

  useEffect(() => {
    if (infUsuario) {
      EstablecerColoresDelModoOscuro(infUsuario.ModoOscuro);
    }
  }, [infUsuario]);

  const ValidarCookie = async () => {
    const cookies = Cookies.get();
    if (!cookies.TOKEN_DE_ACCESO_USMX) {
      return QuitarInformacionAlmacenada();
    }
    try {
      const res = await SolicitudVerificarToken({
        TOKEN_DE_ACCESO_USMX: cookies.TOKEN_DE_ACCESO_USMX,
      });
      if (res.data) {
        EstablecerInformacionObtenida(res.data);
      }
    } catch (err) {
      console.log(err);
      QuitarInformacionAlmacenada();
    }
  };

  const EstablecerColoresDelModoOscuro = async (ModoOscuro) => {
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
  };

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

  const ObtenerNombreYLogoDelSistema = async () => {
    try {
      const res = await SolicitudObtenerNombreYLogoDelSistema();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ActualizarLogoSistema = async (data) => {
    try {
      const res = await SolicitudActualizarLogoSistema(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const ActualizarInformacionDelSistema = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionDelSistema(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const ObtenerResumenDiario = async (data) => {
    try {
      const res = await SolicitudObtenerResumenDiario(data);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CerrarSesion = async () => {
    try {
      await SolicitudCerrarSesion();
      return QuitarInformacionAlmacenada();
    } catch (error) {
      console.log(error);
      return QuitarInformacionAlmacenada();
    }
  };

  return (
    <SistemaContext.Provider
      value={{
        infSistema,
        infUsuario,
        tieneCookie,
        cargandoInformacion,
        obtenerInformacionNuevamente,
        establecerObtenerInformacionNuevamente,
        ActualizarModoOscuro,
        ActualizarIdioma,
        ObtenerNombreYLogoDelSistema,
        ActualizarLogoSistema,
        ActualizarInformacionDelSistema,
        ObtenerResumenDiario,
        CerrarSesion,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};
