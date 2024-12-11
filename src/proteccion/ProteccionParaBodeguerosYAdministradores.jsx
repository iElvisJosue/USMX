import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";

export default function ProteccionParaBodeguerosYAdministradores() {
  const { infUsuario } = useUsuarios();

  if (
    infUsuario.Permisos !== "Bodega" &&
    infUsuario.Permisos !== "Administrador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
