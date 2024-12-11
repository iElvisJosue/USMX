import { createContext, useContext } from "react";
export const OperacionesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useOperaciones = () => {
  const context = useContext(OperacionesContext);
  if (!context) {
    throw new Error(
      "useOperaciones debería ser usado dentro de Proveedor OPERACIONES"
    );
  }
  return context;
};
