// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useBodega } from "../../../context/BodegaContext";
import { useSistema } from "../../../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { ObtenerFechaActual } from "../../../helpers/FuncionesGenerales";

export default function useBuscarSalidasABodegaPorFecha() {
  const {
    BuscarTodasLasSalidasABodegaPorFecha,
    BuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha,
  } = useBodega();
  const { infUsuario } = useSistema();
  const [salidasPorFecha, establecerSalidasPorFecha] = useState([]);
  const [cargandoSalidasPorFecha, establecerCargandoSalidaPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerSalidasPorFecha() {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasSalidasABodegaPorFecha({
                primeraFecha,
                segundaFecha,
              })
            : await BuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha({
                idUsuario: infUsuario.idUsuario,
                primeraFecha,
                segundaFecha,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerSalidasPorFecha(res.data);
        }
        establecerCargandoSalidaPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerSalidasPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    salidasPorFecha,
    cargandoSalidasPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
