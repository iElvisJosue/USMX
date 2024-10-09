import axios from "./axios";

// PETICIÓN PARA REGISTRAR UNA NUEVA OCURRENCIA
export const SolicitudRegistrarOcurre = (data) =>
  axios.post("/ocurre/RegistrarOcurre", data);
