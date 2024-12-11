import { createContext, useContext } from "react";
export const PedidosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos debería ser usado dentro de Proveedor PEDIDOS");
  }
  return context;
};
