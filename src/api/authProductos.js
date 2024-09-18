import axios from "./axios";

// PETICIÓN PARA REGISTRAR UNA AGENCIA
export const SolicitudObtenerProductosPorAgencia = (data) =>
  axios.post("/productos/ObtenerProductosPorAgencia", data);
