/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
export const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error(
      "useProductos debería ser usado dentro de Proveedor PRODUCTOS"
    );
  }
  return context;
};
