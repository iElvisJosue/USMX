import { createContext, useContext } from "react";
export const OcurreContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useOcurre = () => {
  const context = useContext(OcurreContext);
  if (!context) {
    throw new Error("useOcurre debería ser usado dentro de Proveedor OCURRE");
  }
  return context;
};
