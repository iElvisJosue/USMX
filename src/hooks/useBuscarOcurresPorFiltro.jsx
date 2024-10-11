import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../context/OcurreContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarOcurresPorFiltro() {
  const { BuscarOcurresPorFiltro } = useOcurre();

  const [ocurres, establecerOcurres] = useState(null);
  const [cargandoOcurres, establecerCargandoOcurres] = useState(true);
  const [filtroOcurres, establecerFiltroOcurres] = useState("");
  const [obtenerOcurresNuevamente, establecerObtenerOcurresNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerOcurres = async () => {
      try {
        const res = await BuscarOcurresPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroOcurres,
        });
        establecerOcurres(res.data);
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
