import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarPedidosPorFiltro() {
  const { BuscarTodosLosPedidosPorFiltro, BuscarPedidosDeUnUsuarioPorFiltro } =
    usePedidos();
  const { infUsuario } = useSistema();

  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarPedidosPorFiltro = async () => {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodosLosPedidosPorFiltro({
                filtro,
              })
            : await BuscarPedidosDeUnUsuarioPorFiltro({
                idUsuario: infUsuario.idUsuario,
                filtro,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPedidos(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarPedidosPorFiltro();
  }, [filtro]);

  return { pedidos, cargando, filtro, establecerFiltro };
}
