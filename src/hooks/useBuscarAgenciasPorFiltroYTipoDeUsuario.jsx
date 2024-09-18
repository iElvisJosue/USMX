import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../context/AgenciasContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarAgenciasPorFiltroYTipoDeUsuario() {
  const { BuscarAgenciasPorFiltroYTipoDeUsuario } = useAgencias();
  const { usuario } = useGlobal();

  const [agencias, establecerAgencias] = useState([]);
  const [cargandoAgencias, establecerCargandoAgencias] = useState(true);
  const [filtroAgencias, establecerFiltroAgencias] = useState("");

  useEffect(() => {
    const obtenerAgencias = async () => {
      try {
        const res = await BuscarAgenciasPorFiltroYTipoDeUsuario({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroAgencias,
          tipoDeUsuario: usuario.Permisos,
          idDelUsuario: usuario.idUsuario,
        });
        establecerAgencias(res.data);
        establecerCargandoAgencias(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgencias();
  }, [filtroAgencias]);

  return {
    agencias,
    cargandoAgencias,
    filtroAgencias,
    establecerFiltroAgencias,
  };
}
