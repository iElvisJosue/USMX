// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useObtenerCiudadesPorEstado(idEstado = null) {
  const { ObtenerCiudadesPorEstado } = useOperaciones();
  const [ciudadesPorEstado, establecerCiudadesPorEstado] = useState(null);

  useEffect(() => {
    const obtenerCiudadPorEstado = async () => {
      try {
        const res = await ObtenerCiudadesPorEstado({
          CookieConToken: COOKIE_CON_TOKEN,
          idEstado,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
          establecerCiudadesPorEstado([]);
        } else {
          establecerCiudadesPorEstado(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCiudadPorEstado();
  }, [idEstado]);

  return { ciudadesPorEstado };
}
