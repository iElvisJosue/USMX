import { Navigate, Outlet } from "react-router-dom";
import { useSistema } from "../context/SistemaContext";

export default function ProteccionParaBodeguerosYAdministradores() {
  const { infUsuario } = useSistema();

  if (
    infUsuario.Permisos !== "Bodega" &&
    infUsuario.Permisos !== "Administrador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
