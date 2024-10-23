import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarPaisesPorFiltro() {
  const { BuscarPaisesPorFiltro } = useConfiguracion();

  const [paises, establecerPaises] = useState([]);
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
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPaises(res.data);
        }
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
