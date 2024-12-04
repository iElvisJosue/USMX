import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../context/BodegaContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

export default function useObtenerPedidosDeUnaDevolucion(idDevolucion) {
  const { ObtenerPedidosDeUnaDevolucion } = useBodega();
  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);

  useEffect(() => {
    const buscarPedidosDeUnaDevolucion = async () => {
      try {
        const res = await ObtenerPedidosDeUnaDevolucion({
          CookieConToken: COOKIE_CON_TOKEN,
          idDevolucion,
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
    buscarPedidosDeUnaDevolucion();
  }, []);

  return { pedidos, cargando };
}
