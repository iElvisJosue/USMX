import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarMovimientosBodegaPorFiltro() {
  const {
    BuscarTodosLosMovimientosEnBodegaPorFiltro,
    BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro,
  } = useBodega();
  const { usuario } = useGlobal();

  const [movimientosBodega, establecerMovimientosBodega] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarMovimientosBodegaPorFiltro = async () => {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarTodosLosMovimientosEnBodegaPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                filtro,
              })
            : await BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: usuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerMovimientosBodega(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarMovimientosBodegaPorFiltro();
  }, [filtro]);

  return { movimientosBodega, cargando, filtro, establecerFiltro };
}
