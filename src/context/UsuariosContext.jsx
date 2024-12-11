/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const UsuariosContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error(
      "useUsuarios debería ser usado dentro de Proveedor USUARIOS"
    );
  }
  return context;
};
