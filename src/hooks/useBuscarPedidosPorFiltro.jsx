import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarPedidosPorFiltro() {
  const { BuscarTodosLosPedidosPorFiltro, BuscarPedidosDeUnUsuarioPorFiltro } =
    usePedidos();
  const { usuario } = useGlobal();

  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarPedidosPorFiltro = async () => {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarTodosLosPedidosPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                filtro,
              })
            : await BuscarPedidosDeUnUsuarioPorFiltro({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: usuario.idUsuario,
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