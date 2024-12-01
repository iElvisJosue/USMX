import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarDevolucionesPorFiltro() {
  const {
    BuscarTodasLasDevolucionesPorFiltro,
    BuscarDevolucionesDeUnBodegueroPorFiltro,
  } = useBodega();
  const { usuario } = useGlobal();

  const [devoluciones, establecerDevoluciones] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarDevolucionesPorFiltro = async () => {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarTodasLasDevolucionesPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                filtro,
              })
            : await BuscarDevolucionesDeUnBodegueroPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: usuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerDevoluciones(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarDevolucionesPorFiltro();
  }, [filtro]);

  return { devoluciones, cargando, filtro, establecerFiltro };
}
