import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarEntradasABodegaPorFiltro() {
  const {
    BuscarTodasLasEntradasABodegaPorFiltro,
    BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro,
  } = useBodega();
  const { usuario } = useGlobal();

  const [entradas, establecerEntradas] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarEntradasPorFiltro = async () => {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarTodasLasEntradasABodegaPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                filtro,
              })
            : await BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: usuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerEntradas(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarEntradasPorFiltro();
  }, [filtro]);

  return { entradas, cargando, filtro, establecerFiltro };
}
