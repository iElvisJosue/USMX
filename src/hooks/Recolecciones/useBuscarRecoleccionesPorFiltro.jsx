import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useRecolecciones } from "../../context/RecoleccionesContext";
import { useSistema } from "../../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarRecoleccionesPorFiltro() {
  const {
    BuscarTodasLasRecoleccionesPorFiltro,
    BuscarRecoleccionesDeUnChoferPorFiltro,
  } = useRecolecciones();
  const { infUsuario } = useSistema();

  const [recolecciones, establecerRecolecciones] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarRecoleccionesPorFiltro = async () => {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasRecoleccionesPorFiltro({
                filtro,
              })
            : await BuscarRecoleccionesDeUnChoferPorFiltro({
                idUsuario: infUsuario.idUsuario,
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
