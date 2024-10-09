import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerMovimientos() {
  const { ObtenerTodosLosMovimientos } = useOperaciones();

  const [filtro, establecerFiltro] = useState("");
  const [movimientos, establecerMovimientos] = useState(null);
  const [cargandoMovimientos, establecerCargandoMovimientos] = useState(true);
  const [obtenerMovimientosNuevamente, establecerObtenerMovimientosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      try {
        const res = await ObtenerTodosLosMovimientos({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
        });
        establecerMovimientos(res.data);
        establecerCargandoMovimientos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovimientos();
  }, [filtro, obtenerMovimientosNuevamente]);

  return {
    movimientos,
    cargandoMovimientos,
    obtenerMovimientosNuevamente,
    establecerObtenerMovimientosNuevamente,
    filtro,
    establecerFiltro,
  };
}
