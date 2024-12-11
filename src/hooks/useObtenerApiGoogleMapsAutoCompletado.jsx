import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useObtenerApiGoogleMapsAutoCompletado() {
  const { ObtenerApiGoogleMapsAutoCompletado } = useConfiguracion();
  const [apiGoogleMapsAutoCompletado, establecerApiGoogleMapsAutoCompletado] =
    useState(false);

  useEffect(() => {
    const obtenerApiGoogleMapsAutoCompletado = async () => {
      try {
        const res = await ObtenerApiGoogleMapsAutoCompletado();
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerApiGoogleMapsAutoCompletado(res.data[0].LlaveApi);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerApiGoogleMapsAutoCompletado();
  }, []);

  return {
    apiGoogleMapsAutoCompletado,
  };
}
