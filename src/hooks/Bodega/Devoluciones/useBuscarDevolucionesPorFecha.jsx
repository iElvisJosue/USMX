// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useBodega } from "../../../context/BodegaContext";
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { ObtenerFechaActual } from "../../../helpers/FuncionesGenerales";

export default function useBuscarDevolucionesPorFecha() {
  const {
    BuscarTodasLasDevolucionesPorFecha,
    BuscarDevolucionesDeUnBodegueroPorFecha,
  } = useBodega();
  const { infUsuario } = useUsuarios();
  const [devolucionesPorFecha, establecerDevolucionesPorFecha] = useState([]);
  const [cargandoDevolucionesPorFecha, establecerCargandoDevolucionesPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerDevolucionesPorFecha() {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasDevolucionesPorFecha({
                primeraFecha,
                segundaFecha,
              })
            : await BuscarDevolucionesDeUnBodegueroPorFecha({
                idUsuario: infUsuario.idUsuario,
                primeraFecha,
                segundaFecha,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerDevolucionesPorFecha(res.data);
        }
        establecerCargandoDevolucionesPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerDevolucionesPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    devolucionesPorFecha,
    cargandoDevolucionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
