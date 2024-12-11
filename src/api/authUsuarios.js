import axios from "./axios";
// IMPORTAMOS LAS AYUDAS
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

// SOLICITUD PARA VERIFICAR EL TOKEN DE ACCESO DE UN USUARIO
export const SolicitudVerificarTokenUsuario = (data) =>
  axios.post("/usuarios/VerificarTokenUsuario", data);
// SOLICITUD PARA INICIAR SESION
export const SolicitudIniciarSesionUsuario = (data) =>
  axios.post("/usuarios/IniciarSesionUsuario", data);
// SOLICITUD PARA ACTUALIZAR LA INFORMACION DE UN USUARIO
export const SolicitudActualizarInformacionDeUnUsuario = (data) =>
  axios.put(
    "/usuarios/ActualizarInformacionDeUnUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ACTUALIZAR LA FOTO DE UN USUARIO
export const SolicitudActualizarFotoUsuario = (data) =>
  axios.put("/usuarios/ActualizarFotoUsuario", data);
// SOLICITUD PARA ACTUALIZAR LA INFORMACION PERSONAL DE UN USUARIO
export const SolicitudActualizarInformacionPersonalUsuario = (data) =>
  axios.put(
    "/usuarios/ActualizarInformacionPersonalUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ACTUALIZAR LA CONTRASEÑA DE UN USUARIO
export const SolicitudActualizarContraseñaUsuario = (data) =>
  axios.put(
    "/usuarios/ActualizarContrasenaUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA REGISTRAR UN USUARIO
export const SolicitudRegistrarUsuario = (data) =>
  axios.post("/usuarios/RegistrarUsuario", AgregarCookiePeticion(data));
// SOLICITUD PARA BUSCAR USUARIOS PARA ADMINISTRAR POR FILTRO
export const SolicitudBuscarUsuariosParaAdministrarPorFiltro = (data) =>
  axios.post(
    "/usuarios/BuscarUsuariosParaAdministrarPorFiltro",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ACTIVAR O DESACTIVAR UN USUARIO
export const SolicitudActualizarEstadoUsuario = (data) =>
  axios.put("/usuarios/ActualizarEstadoUsuario", AgregarCookiePeticion(data));
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE TIENE EL USUARIO
export const SolicitudBuscarAgenciasQueTieneElUsuario = (data) =>
  axios.post(
    "/usuarios/BuscarAgenciasQueTieneElUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE NO TIENE EL USUARIO
export const SolicitudBuscarAgenciasQueNoTieneElUsuario = (data) =>
  axios.post(
    "/usuarios/BuscarAgenciasQueNoTieneElUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA ASIGNAR UNA AGENCIA AL USUARIO
export const SolicitudAsignarAgenciaAlUsuario = (data) =>
  axios.post("/usuarios/AsignarAgenciaAlUsuario", AgregarCookiePeticion(data));
// SOLICITUD PARA DESASIGNAR UNA AGENCIA AL USUARIO
export const SolicitudDesasignarAgenciaAlUsuario = (data) =>
  axios.post(
    "/usuarios/DesasignarAgenciaAlUsuario",
    AgregarCookiePeticion(data)
  );
// SOLICITUD PARA CERRAR SESION
export const SolicitudCerrarSesionUsuario = () =>
  axios.post("/usuarios/CerrarSesionUsuario");
