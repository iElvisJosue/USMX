import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarPaisesPorFiltro() {
  const { BuscarPaisesPorFiltro } = useConfiguracion();

  const [paises, establecerPaises] = useState(null);
  const [cargandoPaises, establecerCargandoPaises] = useState(true);
  const [filtroPaises, establecerFiltroPaises] = useState("");
  const [obtenerPaisesNuevamente, establecerObtenerPaisesNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const res = await BuscarPaisesPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroPaises,
        });
        establecerPaises(res.data);
        establecerCargandoPaises(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPaises();
  }, [filtroPaises, obtenerPaisesNuevamente]);

  return {
    paises,
    cargandoPaises,
    filtroPaises,
    establecerFiltroPaises,
    obtenerPaisesNuevamente,
    establecerObtenerPaisesNuevamente,
  };
}
