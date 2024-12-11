import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";

export default function ProteccionParaChoferesYAdministradores() {
  const { infUsuario } = useUsuarios();

  if (
    infUsuario.Permisos !== "Chofer" &&
    infUsuario.Permisos !== "Administrador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
