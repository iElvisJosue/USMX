import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarColoniasPorFiltro() {
  const { BuscarColoniasPorFiltro } = useConfiguracion();

  const [colonias, establecerColonias] = useState(null);
  const [cargandoColonias, establecerCargandoColonias] = useState(true);
  const [filtroColonias, establecerFiltroColonias] = useState("");
  const [obtenerColoniasNuevamente, establecerObtenerColoniasNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerColonias = async () => {
      try {
        const res = await BuscarColoniasPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroColonias,
        });
        establecerColonias(res.data);
        establecerCargandoColonias(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerColonias();
  }, [filtroColonias, obtenerColoniasNuevamente]);

  return {
    colonias,
    cargandoColonias,
    filtroColonias,
    establecerFiltroColonias,
    obtenerColoniasNuevamente,
    establecerObtenerColoniasNuevamente,
  };
}