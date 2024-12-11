import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerPedidosDeUnaSalida(idSalidaBodega) {
  const { ObtenerPedidosDeUnaSalida } = useBodega();
  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);

  useEffect(() => {
    const buscarPedidosDeUnaSalida = async () => {
      try {
        const res = await ObtenerPedidosDeUnaSalida({
          idSalidaBodega,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPedidos(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
        console.log(error);
      }
    };
    buscarPedidosDeUnaSalida();
  }, []);

  return { pedidos, cargando };
}
