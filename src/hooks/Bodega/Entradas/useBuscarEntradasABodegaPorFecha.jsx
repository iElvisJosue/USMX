// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useBodega } from "../../../context/BodegaContext";
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ObtenerFechaActual } from "../../../helpers/FuncionesGenerales";

export default function useBuscarEntradasABodegaPorFecha() {
  const {
    BuscarTodasLasEntradasABodegaPorFecha,
    BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha,
  } = useBodega();
  const { usuario } = useGlobal();
  const [entradasPorFecha, establecerEntradasPorFecha] = useState([]);
  const [cargandoEntradasPorFecha, establecerCargandoEntradasPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerEntradasPorFecha() {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarTodasLasEntradasABodegaPorFecha({
                CookieConToken: COOKIE_CON_TOKEN,
                primeraFecha,
                segundaFecha,
              })
            : await BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: usuario.idUsuario,
                primeraFecha,
                segundaFecha,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerEntradasPorFecha(res.data);
        }
        establecerCargandoEntradasPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerEntradasPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    entradasPorFecha,
    cargandoEntradasPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
