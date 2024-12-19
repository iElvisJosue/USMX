import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerTiposDeEnvio() {
  const { ObtenerTiposDeEnvio } = useOperaciones();
  const [envios, establecerEnvios] = useState([]);
  const [cargandoEnvios, establecerCargandoEnvios] = useState(true);
  const [obtenerEnviosNuevamente, establecerObtenerEnviosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerTiposDeEnvio = async () => {
      try {
        const res = await ObtenerTiposDeEnvio();
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerEnvios(res.data);
        }
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
