import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerTiposDeEnvio() {
  const { ObtenerTiposDeEnvio } = useConfiguracion();
  const [envios, establecerEnvios] = useState(null);
  const [cargandoEnvios, establecerCargandoEnvios] = useState(true);
  const [obtenerEnviosNuevamente, establecerObtenerEnviosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerTiposDeEnvio = async () => {
      try {
        const res = await ObtenerTiposDeEnvio({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        establecerEnvios(res.data);
        establecerCargandoEnvios(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTiposDeEnvio();
  }, [obtenerEnviosNuevamente]);

  return {
    envios,
    cargandoEnvios,
    obtenerEnviosNuevamente,
    establecerObtenerEnviosNuevamente,
  };
}
