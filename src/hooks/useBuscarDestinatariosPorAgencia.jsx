import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarDestinatariosPorAgencia({ idAgencia }) {
  const { BuscarDestinatariosPorAgencia } = usePedidos();
  const [destinatarios, establecerDestinatarios] = useState([]);
  const [cargandoDestinatarios, establecerCargandoDestinatarios] =
    useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const obtenerDestinatarios = async () => {
      try {
        const res = await BuscarDestinatariosPorAgencia({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
          idAgencia,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerDestinatarios(res.data);
        }
        establecerCargandoDestinatarios(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDestinatarios();
  }, [filtro]);

  return { destinatarios, cargandoDestinatarios, filtro, establecerFiltro };
}
