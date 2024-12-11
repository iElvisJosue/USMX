import { Navigate, Outlet } from "react-router-dom";
import { useSistema } from "../context/SistemaContext";
import { useUsuarios } from "../context/UsuariosContext";
import Cargando from "../componentes/Cargando";

export default function ProteccionPorCookies() {
  const { cargandoInfSistema } = useSistema();
  const { cargandoInfUsuario, tieneCookie } = useUsuarios();

  if (cargandoInfUsuario || cargandoInfSistema) return <Cargando />;
  if (!cargandoInfUsuario && !tieneCookie) return <Navigate to="/" replace />;

  return <Outlet />;
}
