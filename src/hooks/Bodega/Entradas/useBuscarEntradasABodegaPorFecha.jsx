// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useBodega } from "../../../context/BodegaContext";
import { useSistema } from "../../../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { ObtenerFechaActual } from "../../../helpers/FuncionesGenerales";

export default function useBuscarEntradasABodegaPorFecha() {
  const {
    BuscarTodasLasEntradasABodegaPorFecha,
    BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha,
  } = useBodega();
  const { infUsuario } = useSistema();
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
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasEntradasABodegaPorFecha({
                primeraFecha,
                segundaFecha,
              })
            : await BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha({
                idUsuario: infUsuario.idUsuario,
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
