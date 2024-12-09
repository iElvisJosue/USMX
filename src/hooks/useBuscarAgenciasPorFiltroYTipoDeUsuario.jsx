import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../context/AgenciasContext";
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarAgenciasPorFiltroYTipoDeUsuario() {
  const { BuscarAgenciasPorFiltroYTipoDeUsuario } = useAgencias();
  const { infUsuario } = useUsuarios();

  const [agencias, establecerAgencias] = useState([]);
  const [cargandoAgencias, establecerCargandoAgencias] = useState(true);
  const [filtroAgencias, establecerFiltroAgencias] = useState("");
  const [obtenerAgenciasNuevamente, establecerObtenerAgenciasNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerAgencias = async () => {
      try {
        const res = await BuscarAgenciasPorFiltroYTipoDeUsuario({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroAgencias,
          tipoDeUsuario: infUsuario.Permisos,
          idDelUsuario: infUsuario.idUsuario,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerAgencias(res.data);
        }
        establecerCargandoAgencias(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgencias();
  }, [filtroAgencias, obtenerAgenciasNuevamente]);

  return {
    agencias,
    cargandoAgencias,
    filtroAgencias,
    establecerFiltroAgencias,
    obtenerAgenciasNuevamente,
    establecerObtenerAgenciasNuevamente,
  };
}
