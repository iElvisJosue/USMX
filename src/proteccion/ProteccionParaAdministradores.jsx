import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";

export default function ProteccionParaAdministradores() {
  const { infUsuario } = useUsuarios();

  if (infUsuario.Permisos !== "Administrador")
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
