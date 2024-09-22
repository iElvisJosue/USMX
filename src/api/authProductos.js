import axios from "./axios";

// PETICIÓN PARA OBTENER REGISTRAR UN PRODUCTO
export const SolicitudRegistrarProducto = (data) =>
  axios.post("/productos/RegistrarProducto", data);
// PETICIÓN PARA OBTENER LOS PRODUCTOS DE UNA AGENCIA
export const SolicitudObtenerProductosPorAgencia = (data) =>
  axios.post("/productos/ObtenerProductosPorAgencia", data);
