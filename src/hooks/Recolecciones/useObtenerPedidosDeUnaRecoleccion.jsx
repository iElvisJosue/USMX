import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useRecolecciones } from "../../context/RecoleccionesContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useObtenerPedidosDeUnaRecoleccion(idRecoleccion) {
  const { ObtenerPedidosDeUnaRecoleccion } = useRecolecciones();
  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);

  useEffect(() => {
    const buscarPedidosDeUnaRecoleccion = async () => {
      try {
        const res = await ObtenerPedidosDeUnaRecoleccion({
          idRecoleccion,
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
    buscarPedidosDeUnaRecoleccion();
  }, []);

  return { pedidos, cargando };
}
