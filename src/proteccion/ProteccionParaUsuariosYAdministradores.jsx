import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";

export default function ProteccionParaUsuariosYAdministradores() {
  const { infUsuario } = useUsuarios();

  if (
    infUsuario.Permisos !== "Usuario" &&
    infUsuario.Permisos !== "Administrador" &&
    infUsuario.Permisos !== "Moderador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
