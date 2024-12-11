import { createContext, useContext } from "react";
export const BodegaContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBodega = () => {
  const context = useContext(BodegaContext);
  if (!context) {
    throw new Error("useBodega debería ser usado dentro de Proveedor BODEGA");
  }
  return context;
};
