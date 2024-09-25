// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
// IMPORTAMOS LAS AYUDAS

export default function useBuscarPedidosPorFecha() {
  const { BuscarPedidosPorFecha } = usePedidos();
  const [pedidosPorFecha, establecerPedidosPorFecha] = useState(null);
  const [cargandoPedidosPorFecha, establecerCargandoPedidosPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  function ObtenerFechaActual() {
    const now = new Date();
    const tzoffset = now.getTimezoneOffset() * 60000; // offset en milisegundos
    return new Date(now - tzoffset).toISOString().split("T")[0];
  }

  useEffect(() => {
    async function obtenerPedidosPorFecha() {
      try {
        const res = await BuscarPedidosPorFecha({
          CookieConToken: COOKIE_CON_TOKEN,
          primeraFecha,
          segundaFecha,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPedidosPorFecha(res.data);
          establecerCargandoPedidosPorFecha(false);
        }
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
