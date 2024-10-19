// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerPaisesActivos() {
  const { ObtenerPaisesActivos } = useOperaciones();
  const [paises, establecerPaises] = useState(null);

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const res = await ObtenerPaisesActivos({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        establecerPaises(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPaises();
  }, []);

  return {
    paises,
  };
}
