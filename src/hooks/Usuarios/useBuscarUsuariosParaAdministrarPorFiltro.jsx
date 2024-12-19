import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarUsuariosParaAdministrarPorFiltro() {
  const { infUsuario } = useSistema();
  const { BuscarUsuariosParaAdministrarPorFiltro } = useUsuarios();
  const [usuarios, establecerUsuarios] = useState([]);
  const [cargandoUsuarios, establecerCargandoUsuarios] = useState(true);
  const [filtroUsuario, establecerFiltroUsuario] = useState("");
  const [obtenerUsuariosNuevamente, establecerObtenerUsuariosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await BuscarUsuariosParaAdministrarPorFiltro({
          filtro: filtroUsuario,
          idUsuario: infUsuario.idUsuario,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerUsuarios(res.data);
        }
        establecerCargandoUsuarios(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUsuarios();
  }, [filtroUsuario, obtenerUsuariosNuevamente]);

  return {
    usuarios,
    cargandoUsuarios,
    filtroUsuario,
    establecerFiltroUsuario,
    obtenerUsuariosNuevamente,
    establecerObtenerUsuariosNuevamente,
  };
}
