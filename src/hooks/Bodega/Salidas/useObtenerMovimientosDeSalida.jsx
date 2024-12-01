import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerMovimientosDeSalida() {
  const { ObtenerMovimientosDeSalida } = useBodega();
  const [movimientosSalida, establecerMovimientosSalida] = useState([]);

  useEffect(() => {
    const obtenerMovsDeSalida = async () => {
      try {
        const res = await ObtenerMovimientosDeSalida({
          CookieConToken: COOKIE_CON_TOKEN,
        });

        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerMovimientosSalida(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovsDeSalida();
  }, []);

  return {
    movimientosSalida,
  };
}
