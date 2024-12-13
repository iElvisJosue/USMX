import { Navigate, Outlet } from "react-router-dom";
import { useSistema } from "../context/SistemaContext";

export default function ProteccionParaUsuariosYAdministradores() {
  const { infUsuario } = useSistema();

  if (
    infUsuario.Permisos !== "Usuario" &&
    infUsuario.Permisos !== "Administrador" &&
    infUsuario.Permisos !== "Moderador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
