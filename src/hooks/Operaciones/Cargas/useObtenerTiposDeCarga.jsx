import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerTiposDeCarga() {
  const { ObtenerTiposDeCarga } = useOperaciones();

  const [cargas, establecerCargas] = useState([]);
  const [cargandoCargas, establecerCargandoCargas] = useState(true);
  const [obtenerCargasNuevamente, establecerObtenerCargasNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerCargas = async () => {
      try {
        const res = await ObtenerTiposDeCarga();
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerCargas(res.data);
        }
        establecerCargandoCargas(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCargas();
  }, [obtenerCargasNuevamente]);

  return {
    cargas,
    cargandoCargas,
    obtenerCargasNuevamente,
    establecerObtenerCargasNuevamente,
  };
}
