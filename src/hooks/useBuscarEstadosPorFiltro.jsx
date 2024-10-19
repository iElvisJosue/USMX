import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarEstadosPorFiltro() {
  const { BuscarEstadosPorFiltro } = useConfiguracion();

  const [estados, establecerEstados] = useState(null);
  const [cargandoEstados, establecerCargandoEstados] = useState(true);
  const [filtroEstados, establecerFiltroEstados] = useState("");
  const [obtenerEstadosNuevamente, establecerObtenerEstadosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerEstados = async () => {
      try {
        const res = await BuscarEstadosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroEstados,
        });
        establecerEstados(res.data);
        establecerCargandoEstados(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerEstados();
  }, [filtroEstados, obtenerEstadosNuevamente]);

  return {
    estados,
    cargandoEstados,
    filtroEstados,
    establecerFiltroEstados,
    obtenerEstadosNuevamente,
    establecerObtenerEstadosNuevamente,
  };
}
