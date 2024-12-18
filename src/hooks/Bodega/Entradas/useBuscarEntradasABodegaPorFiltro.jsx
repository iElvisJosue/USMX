import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useSistema } from "../../../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarEntradasABodegaPorFiltro() {
  const {
    BuscarTodasLasEntradasABodegaPorFiltro,
    BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro,
  } = useBodega();
  const { infUsuario } = useSistema();

  const [entradas, establecerEntradas] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarEntradasPorFiltro = async () => {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasEntradasABodegaPorFiltro({
                filtro,
              })
            : await BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro({
                idUsuario: infUsuario.idUsuario,
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
