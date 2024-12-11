import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import Cargando from "../componentes/Cargando";

export default function ProteccionParaAdministradores() {
  const { cargandoInfUsuario, infUsuario } = useUsuarios();

  if (cargandoInfUsuario) return <Cargando />;
  if (infUsuario.Permisos !== "Administrador")
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
