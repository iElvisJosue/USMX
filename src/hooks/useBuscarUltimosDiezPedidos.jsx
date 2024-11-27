import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarUltimosDiezPedidos() {
  const { usuario } = useGlobal();
  const {
    BuscarUltimosDiezPedidosGenerales,
    BuscarUltimosDiezPedidosDeUnUsuario,
  } = usePedidos();
  const [ultimosDiezPedidos, setUltimosDiezPedidos] = useState([]);
  const [cargandoUltimosDiezPedidos, establecerCargandoUltimosDiezPedidos] =
    useState(true);
  const [buscarNuevamente, establecerBuscarNuevamente] = useState(false);
  useEffect(() => {
    const obtenerUltimosDiezPedidos = async () => {
      try {
        const res =
          usuario.Permisos === "Administrador"
            ? await BuscarUltimosDiezPedidosGenerales()
            : await BuscarUltimosDiezPedidosDeUnUsuario({
                idUsuario: usuario.idUsuario,
              });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          setUltimosDiezPedidos(res.data);
        }
        establecerCargandoUltimosDiezPedidos(false);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerUltimosDiezPedidos();
  }, [buscarNuevamente]);
  return {
    ultimosDiezPedidos,
    cargandoUltimosDiezPedidos,
    buscarNuevamente,
    establecerBuscarNuevamente,
  };
}
