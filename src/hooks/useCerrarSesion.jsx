// LIBRERÍAS A USAR
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// AYUDAS
import { ESTILOS_PROMISE } from "../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

export default function useCerrarSesion() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { CerrarSesion } = useSistema();

  const NOMBRE_COOKIE = "TOKEN_DE_ACCESO_USMX";
  const CerrandoSesion = (e) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    e.preventDefault();

    // Promesa para cerrar sesión
    const promesaCerrandoSesion = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          CerrarSesion();
          Cookies.remove(NOMBRE_COOKIE);
          establecerPeticionPendiente(false);
          resolve(); // Marca la promesa como resuelta
        } catch (error) {
          establecerPeticionPendiente(false);
          reject(error); // Marca la promesa como rechazada en caso de error
        }
      }, 1500);
    });

    toast.promise(promesaCerrandoSesion, {
      loading: "Cerrando sesión, por favor espere...",
      success: "¡Sesión cerrada con éxito!",
      error: "Error al cerrar sesión",
      style: ESTILOS_PROMISE,
    });
  };

  return { CerrandoSesion };
}
