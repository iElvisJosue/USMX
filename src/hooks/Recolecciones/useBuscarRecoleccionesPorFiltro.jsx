import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useRecolecciones } from "../../context/RecoleccionesContext";
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarRecoleccionesPorFiltro() {
  const {
    BuscarTodasLasRecoleccionesPorFiltro,
    BuscarRecoleccionesDeUnChoferPorFiltro,
  } = useRecolecciones();
  const { usuario } = useGlobal();

  const [recolecciones, establecerRecolecciones] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarRecoleccionesPorFiltro = async () => {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarTodasLasRecoleccionesPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                filtro,
              })
            : await BuscarRecoleccionesDeUnChoferPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: usuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerRecolecciones(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarRecoleccionesPorFiltro();
  }, [filtro]);

  return { recolecciones, cargando, filtro, establecerFiltro };
}
