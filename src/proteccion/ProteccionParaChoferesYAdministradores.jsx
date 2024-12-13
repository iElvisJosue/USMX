import { Navigate, Outlet } from "react-router-dom";
import { useSistema } from "../context/SistemaContext";

export default function ProteccionParaChoferesYAdministradores() {
  const { infUsuario } = useSistema();

  if (
    infUsuario.Permisos !== "Chofer" &&
    infUsuario.Permisos !== "Administrador"
  )
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
