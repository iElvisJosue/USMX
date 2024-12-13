import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useObtenerLogoYNombreDelSistema() {
  const { ObtenerNombreYLogoDelSistema } = useSistema();

  const [logoNombreSistema, establecerLogoNombreSistema] = useState(null);
  const [cargandoLogoNombreSistema, establecerCargandoLogoNombreSistema] =
    useState(true);

  useEffect(() => {
    const obtenerNombreLogoSistema = async () => {
      try {
        const res = await ObtenerNombreYLogoDelSistema();
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerLogoNombreSistema(res);
        }
        establecerCargandoLogoNombreSistema(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerNombreLogoSistema();
  }, []);

  return {
    cargandoLogoNombreSistema,
    logoNombreSistema,
  };
}
