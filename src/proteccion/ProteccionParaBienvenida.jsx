import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import Cargando from "../componentes/Cargando";

export default function ProteccionParaBienvenida() {
  const { cargandoInfUsuario, infUsuario } = useUsuarios();

  if (cargandoInfUsuario) return <Cargando />;
  if (infUsuario.Permisos === "Chofer") {
    return <Navigate to="/Recolecciones" replace />;
  }
  if (infUsuario.Permisos === "Bodega") {
    return <Navigate to="/Bodega-Entradas" replace />;
  }

  return <Outlet />;
}
