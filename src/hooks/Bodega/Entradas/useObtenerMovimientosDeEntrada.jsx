import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerMovimientosDeEntrada() {
  const { ObtenerMovimientosDeEntrada } = useBodega();
  const [movimientosEntrada, establecerMovimientosEntrada] = useState([]);

  useEffect(() => {
    const obtenerMovsDeEntrada = async () => {
      try {
        const res = await ObtenerMovimientosDeEntrada({
          CookieConToken: COOKIE_CON_TOKEN,
        });

        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerMovimientosEntrada(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovsDeEntrada();
  }, []);

  return {
    movimientosEntrada,
  };
}
