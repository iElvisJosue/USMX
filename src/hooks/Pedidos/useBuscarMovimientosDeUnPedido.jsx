import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarMovimientosDeUnPedido(GuiaPedido) {
  const { BuscarMovimientosDeUnPedido } = usePedidos();
  const [movimientos, establecerMovimientos] = useState([]);
  const [cargandoMovimientos, establecerCargandoMovimientos] = useState(true);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      try {
        const res = await BuscarMovimientosDeUnPedido({
          GuiaPedido,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerMovimientos(res.data);
        }
        establecerCargandoMovimientos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovimientos();
  }, [GuiaPedido]);

  return { movimientos, cargandoMovimientos };
}
