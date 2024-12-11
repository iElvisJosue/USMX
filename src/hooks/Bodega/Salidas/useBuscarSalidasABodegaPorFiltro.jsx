import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarSalidasABodegaPorFiltro() {
  const {
    BuscarTodasLasSalidasABodegaPorFiltro,
    BuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro,
  } = useBodega();
  const { infUsuario } = useUsuarios();

  const [salidas, establecerSalidas] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarSalidasPorFiltro = async () => {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasSalidasABodegaPorFiltro({
                filtro,
              })
            : await BuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro({
                idUsuario: infUsuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerSalidas(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarSalidasPorFiltro();
  }, [filtro]);

  return { salidas, cargando, filtro, establecerFiltro };
}
