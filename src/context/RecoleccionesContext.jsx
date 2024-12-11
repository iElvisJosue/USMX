/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
export const RecoleccionesContext = createContext();
export const useRecolecciones = () => {
  const context = useContext(RecoleccionesContext);
  if (!context) {
    throw new Error(
      "useRecolecciones debería ser usado dentro de Proveedor RECOLECCIONES"
    );
  }
  return context;
};
