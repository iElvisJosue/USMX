// LIBRERÍAS A USAR
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// AYUDAS
import { ESTILOS_PROMISE } from "../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

export default function useCerrarSesion() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { CerrarSesion } = useGlobal();

  const NOMBRE_COOKIE = "TokenDeAcceso";

  const CerrandoSesion = (e) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);

    e.preventDefault();
    const promesaCerrandoSesion = new Promise(() => {
      setTimeout(() => {
        CerrarSesion();
        Cookies.remove(NOMBRE_COOKIE);
        establecerPeticionPendiente(false);
        return;
      }, 1500);
    });

    toast.promise(promesaCerrandoSesion, {
      loading: "Cerrando sesión, por favor espere...",
      style: ESTILOS_PROMISE,
    });
  };

  return { CerrandoSesion };
}
