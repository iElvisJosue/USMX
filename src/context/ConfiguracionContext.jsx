/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
export const ConfiguracionContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConfiguracion = () => {
  const context = useContext(ConfiguracionContext);
  if (!context) {
    throw new Error(
      "useConfiguracion debería ser usado dentro de Proveedor CONFIGURACION"
    );
  }
  return context;
};
