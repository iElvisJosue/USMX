// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useBodega } from "../../../context/BodegaContext";
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ObtenerFechaActual } from "../../../helpers/FuncionesGenerales";

export default function useBuscarMovimientosBodegaPorFecha() {
  const {
    BuscarTodosLosMovimientosEnBodegaPorFecha,
    BuscarMovimientosEnBodegaDeUnBodegueroPorFecha,
  } = useBodega();
  const { infUsuario } = useUsuarios();
  const [movimientosPorFecha, establecerMovimientosPorFecha] = useState([]);
  const [cargandoMovimientosPorFecha, establecerCargandoMovimientosPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerMovimientosPorFecha() {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodosLosMovimientosEnBodegaPorFecha({
                CookieConToken: COOKIE_CON_TOKEN,
                primeraFecha,
                segundaFecha,
              })
            : await BuscarMovimientosEnBodegaDeUnBodegueroPorFecha({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: infUsuario.idUsuario,
                primeraFecha,
                segundaFecha,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerMovimientosPorFecha(res.data);
        }
        establecerCargandoMovimientosPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerMovimientosPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    movimientosPorFecha,
    cargandoMovimientosPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
