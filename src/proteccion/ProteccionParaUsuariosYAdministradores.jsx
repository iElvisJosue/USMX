import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import Cargando from "../componentes/Cargando";

export default function ProteccionParaUsuariosYAdministradores() {
  const { cargandoInfUsuario, infUsuario } = useUsuarios();

  if (cargandoInfUsuario) return <Cargando />;
  if (
    infUsuario.Permisos !== "Usuario" &&
    infUsuario.Permisos !== "Administrador" &&
    infUsuario.Permisos !== "Moderador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
