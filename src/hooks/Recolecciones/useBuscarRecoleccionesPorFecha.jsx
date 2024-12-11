// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useRecolecciones } from "../../context/RecoleccionesContext";
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { ObtenerFechaActual } from "../../helpers/FuncionesGenerales";

export default function useBuscarLasRecoleccionesPorFecha() {
  const {
    BuscarTodasLasRecoleccionesPorFecha,
    BuscarRecoleccionesDeUnChoferPorFecha,
  } = useRecolecciones();
  const { infUsuario } = useUsuarios();
  const [recoleccionesPorFecha, establecerRecoleccionesPorFecha] = useState([]);
  const [
    cargandoRecoleccionesPorFecha,
    establecerCargandoRecoleccionesPorFecha,
  ] = useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerRecoleccionesPorFecha() {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasRecoleccionesPorFecha({
                primeraFecha,
                segundaFecha,
              })
            : await BuscarRecoleccionesDeUnChoferPorFecha({
                idUsuario: infUsuario.idUsuario,
                primeraFecha,
                segundaFecha,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerRecoleccionesPorFecha(res.data);
        }
        establecerCargandoRecoleccionesPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerRecoleccionesPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    recoleccionesPorFecha,
    cargandoRecoleccionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
