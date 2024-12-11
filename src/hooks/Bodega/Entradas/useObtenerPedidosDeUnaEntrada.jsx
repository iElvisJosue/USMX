import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerPedidosDeUnaEntrada(idEntradaBodega) {
  const { ObtenerPedidosDeUnaEntrada } = useBodega();
  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);

  useEffect(() => {
    const buscarPedidosDeUnaEntrada = async () => {
      try {
        const res = await ObtenerPedidosDeUnaEntrada({
          idEntradaBodega,
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
    buscarPedidosDeUnaEntrada();
  }, []);

  return { pedidos, cargando };
}
