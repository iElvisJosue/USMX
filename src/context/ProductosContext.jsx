/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { SolicitudObtenerProductosPorAgencia } from "../api/authProductos";

export const ProductosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error(
      "useProductos debería ser usado dentro de Proveedor productos"
    );
  }
  return context;
};
export const ProveedorProductos = ({ children }) => {
  const ObtenerProductosPorAgencia = async (data) => {
    try {
      const res = await SolicitudObtenerProductosPorAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        ObtenerProductosPorAgencia,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
