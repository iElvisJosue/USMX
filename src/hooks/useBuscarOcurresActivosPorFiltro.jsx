import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../context/OcurreContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarOcurresActivosPorFiltro() {
  const { BuscarOcurresActivosPorFiltro } = useOcurre();

  const [ocurresActivos, establecerOcurresActivos] = useState([]);
  const [cargandoOcurresActivos, establecerCargandoOcurresActivos] =
    useState(true);
  const [filtroOcurresActivos, establecerFiltroOcurresActivos] = useState("");
  const [
    obtenerOcurresActivosNuevamente,
    establecerObtenerActivosOcurresNuevamente,
  ] = useState(false);

  useEffect(() => {
    const obtenerOcurresActivos = async () => {
      try {
        const res = await BuscarOcurresActivosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroOcurresActivos,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerOcurresActivos(res.data);
        }
        establecerCargandoOcurresActivos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerOcurresActivos();
  }, [filtroOcurresActivos, obtenerOcurresActivosNuevamente]);

  return {
    ocurresActivos,
    cargandoOcurresActivos,
    filtroOcurresActivos,
    establecerFiltroOcurresActivos,
    obtenerOcurresActivosNuevamente,
    establecerObtenerActivosOcurresNuevamente,
  };
}
