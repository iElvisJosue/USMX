// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useObtenerColoniasPorCP(
  CodigoPostal = null,
  Pais = null
) {
  const { ObtenerColoniasPorCodigoPostal } = useOperaciones();
  const [coloniasPorCP, establecerColoniasPorCP] = useState(null);

  useEffect(() => {
    const obtenerColoniasPorCP = async () => {
      try {
        const res = await ObtenerColoniasPorCodigoPostal({
          CookieConToken: COOKIE_CON_TOKEN,
          CodigoPostal,
          Pais,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
          establecerColoniasPorCP([]);
        } else {
          establecerColoniasPorCP(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerColoniasPorCP();
  }, [CodigoPostal, Pais]);

  return { coloniasPorCP };
}
