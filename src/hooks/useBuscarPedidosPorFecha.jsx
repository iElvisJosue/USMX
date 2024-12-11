// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { usePedidos } from "../context/PedidosContext";
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ObtenerFechaActual } from "../helpers/FuncionesGenerales";

export default function useBuscarPedidosPorFecha() {
  const { BuscarTodosLosPedidosPorFecha, BuscarPedidosDeUnUsuarioPorFecha } =
    usePedidos();
  const { infUsuario } = useUsuarios();
  const [pedidosPorFecha, establecerPedidosPorFecha] = useState([]);
  const [cargandoPedidosPorFecha, establecerCargandoPedidosPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerPedidosPorFecha() {
      try {
        const res =
          infUsuario.Permisos === "Administrador"
            ? await BuscarTodosLosPedidosPorFecha({
                CookieConToken: COOKIE_CON_TOKEN,
                primeraFecha,
                segundaFecha,
              })
            : await BuscarPedidosDeUnUsuarioPorFecha({
                CookieConToken: COOKIE_CON_TOKEN,
                idUsuario: infUsuario.idUsuario,
                primeraFecha,
                segundaFecha,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPedidosPorFecha(res.data);
        }
        establecerCargandoPedidosPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerPedidosPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    pedidosPorFecha,
    cargandoPedidosPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
