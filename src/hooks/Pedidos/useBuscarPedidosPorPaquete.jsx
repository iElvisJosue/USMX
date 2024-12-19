import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarPedidosPorPaquete({
  CodigoRastreo,
  GuiaPedido,
}) {
  const { BuscarPedidosPorPaquete } = usePedidos();

  const [paquete, establecerPaquete] = useState([]);
  const [cargandoPaquete, establecerCargandoPaquete] = useState(true);

  useEffect(() => {
    const obtenerPaquete = async () => {
      try {
        const res = await BuscarPedidosPorPaquete({
          CodigoRastreo,
          GuiaPedido,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPaquete(res.data);
        }
        establecerCargandoPaquete(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPaquete();
  }, []);

  return { paquete, cargandoPaquete };
}
