import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerInformacionDeUnUsuario(idUsuario) {
  const { ObtenerInformacionDeUnUsuario } = useUsuarios();
  const [informacionDelUsuario, establecerInformacionDelUsuario] =
    useState(null);
  const [
    cargandoInformacionDelUsuario,
    establecerCargandoInformacionDelUsuario,
  ] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await ObtenerInformacionDeUnUsuario({
          idUsuario,
          CookieConToken: COOKIE_CON_TOKEN,
        });
        establecerInformacionDelUsuario(res.data);
        establecerCargandoInformacionDelUsuario(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUsuario();
  }, []);

  return { informacionDelUsuario, cargandoInformacionDelUsuario };
}
