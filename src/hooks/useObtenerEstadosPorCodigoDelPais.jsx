// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerEstadosPorCodigoDelPais(CodigoPais = null) {
  const { ObtenerEstadosPorCodigoDelPais } = useOperaciones();
  const [estadosPorCodigoDelPais, establecerEstadosPorCodigoDelPais] =
    useState(null);

  useEffect(() => {
    const obtenerEstadosPorCodigoDelPais = async () => {
      try {
        const res = await ObtenerEstadosPorCodigoDelPais({
          CookieConToken: COOKIE_CON_TOKEN,
          CodigoPais,
        });
        establecerEstadosPorCodigoDelPais(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerEstadosPorCodigoDelPais();
  }, [CodigoPais]);

  return { estadosPorCodigoDelPais };
}
