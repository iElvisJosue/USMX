import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useBuscarDevolucionesPorFiltro() {
  const {
    BuscarTodasLasDevolucionesPorFiltro,
    BuscarDevolucionesDeUnBodegueroPorFiltro,
  } = useBodega();
  const { infUsuario } = useUsuarios();

  const [devoluciones, establecerDevoluciones] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarDevolucionesPorFiltro = async () => {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodasLasDevolucionesPorFiltro({
                filtro,
              })
            : await BuscarDevolucionesDeUnBodegueroPorFiltro({
                idUsuario: infUsuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerDevoluciones(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarDevolucionesPorFiltro();
  }, [filtro]);

  return { devoluciones, cargando, filtro, establecerFiltro };
}
