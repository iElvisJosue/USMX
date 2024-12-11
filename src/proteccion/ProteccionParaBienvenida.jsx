import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";

export default function ProteccionParaBienvenida() {
  const { infUsuario } = useUsuarios();

  if (infUsuario.Permisos === "Chofer") {
    return <Navigate to="/Recolecciones" replace />;
  }
  if (infUsuario.Permisos === "Bodega") {
    return <Navigate to="/Bodega-Entradas" replace />;
  }

  return <Outlet />;
}
