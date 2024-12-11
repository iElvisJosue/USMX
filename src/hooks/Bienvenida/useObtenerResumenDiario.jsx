import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { ObtenerFechaActual } from "../../helpers/FuncionesGenerales";

export default function useObtenerResumenDiario() {
  const { ObtenerResumenDiario } = useSistema();
  const [resumen, establecerResumen] = useState([]);
  const [cargandoResumen, establecerCargandoResumen] = useState(true);
  const [obtenerResumenNuevamente, establecerObtenerResumenNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerResumen = async () => {
      try {
        const res = await ObtenerResumenDiario({
          FechaDeHoy: ObtenerFechaActual(),
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerResumen(res);
        }
        establecerCargandoResumen(false);
      } catch (error) {
        console.log(error);
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    };
    obtenerResumen();
  }, [obtenerResumenNuevamente]);

  return {
    resumen,
    cargandoResumen,
    obtenerResumenNuevamente,
    establecerObtenerResumenNuevamente,
  };
}
