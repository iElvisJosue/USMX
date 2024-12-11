import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerMovimientosDeSalida() {
  const { ObtenerMovimientosDeSalida } = useBodega();
  const [movimientosSalida, establecerMovimientosSalida] = useState([]);

  useEffect(() => {
    const obtenerMovsDeSalida = async () => {
      try {
        const res = await ObtenerMovimientosDeSalida();
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
