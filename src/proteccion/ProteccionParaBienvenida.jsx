import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Cargando from "../componentes/Cargando";

export default function ProteccionParaBienvenida() {
  const { cargando, usuario } = useGlobal();

  if (cargando) return <Cargando />;
  if (usuario.Permisos === "Chofer") {
    return <Navigate to="/Recolecciones" replace />;
  }
  if (usuario.Permisos === "Bodega") {
    return <Navigate to="/Bodega-Entradas" replace />;
  }

  return <Outlet />;
}
