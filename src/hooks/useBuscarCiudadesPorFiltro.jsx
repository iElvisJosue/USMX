import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarCiudadesPorFiltro() {
  const { BuscarCiudadesPorFiltro } = useConfiguracion();

  const [ciudades, establecerCiudades] = useState(null);
  const [cargandoCiudades, establecerCargandoCiudades] = useState(true);
  const [filtroCiudades, establecerFiltroCiudades] = useState("");
  const [obtenerCiudadesNuevamente, establecerObtenerCiudadesNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerCiudades = async () => {
      try {
        const res = await BuscarCiudadesPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroCiudades,
        });
        establecerCiudades(res.data);
        establecerCargandoCiudades(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCiudades();
  }, [filtroCiudades, obtenerCiudadesNuevamente]);

  return {
    ciudades,
    cargandoCiudades,
    filtroCiudades,
    establecerFiltroCiudades,
    obtenerCiudadesNuevamente,
    establecerObtenerCiudadesNuevamente,
  };
}
