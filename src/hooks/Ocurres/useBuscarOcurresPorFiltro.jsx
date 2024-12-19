import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../context/OcurreContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarOcurresPorFiltro() {
  const { BuscarOcurresPorFiltro } = useOcurre();

  const [ocurres, establecerOcurres] = useState([]);
  const [cargandoOcurres, establecerCargandoOcurres] = useState(true);
  const [filtroOcurres, establecerFiltroOcurres] = useState("");
  const [obtenerOcurresNuevamente, establecerObtenerOcurresNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerOcurres = async () => {
      try {
        const res = await BuscarOcurresPorFiltro({
          filtro: filtroOcurres,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerOcurres(res.data);
        }
        establecerCargandoOcurres(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerOcurres();
  }, [filtroOcurres, obtenerOcurresNuevamente]);

  return {
    ocurres,
    cargandoOcurres,
    filtroOcurres,
    establecerFiltroOcurres,
    obtenerOcurresNuevamente,
    establecerObtenerOcurresNuevamente,
  };
}
