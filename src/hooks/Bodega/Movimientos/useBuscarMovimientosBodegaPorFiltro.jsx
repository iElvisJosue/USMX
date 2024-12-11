import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarMovimientosBodegaPorFiltro() {
  const {
    BuscarTodosLosMovimientosEnBodegaPorFiltro,
    BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro,
  } = useBodega();
  const { infUsuario } = useUsuarios();

  const [movimientosBodega, establecerMovimientosBodega] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarMovimientosBodegaPorFiltro = async () => {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodosLosMovimientosEnBodegaPorFiltro({
                filtro,
              })
            : await BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro({
                idUsuario: infUsuario.idUsuario,
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
