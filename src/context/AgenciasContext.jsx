import { createContext, useContext } from "react";
export const AgenciasContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAgencias = () => {
  const context = useContext(AgenciasContext);
  if (!context) {
    throw new Error(
      "useAgencias debería ser usado dentro de Proveedor AGENCIAS"
    );
  }
  return context;
};
