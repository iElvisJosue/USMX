import { Navigate, Outlet } from "react-router-dom";
import { useSistema } from "../context/SistemaContext";

export default function ProteccionParaBienvenida() {
  const { infUsuario } = useSistema();

  if (infUsuario.Permisos === "Chofer") {
    return <Navigate to="/Recolecciones" replace />;
  }
  if (infUsuario.Permisos === "Bodega") {
    return <Navigate to="/Bodega-Entradas" replace />;
  }

  return <Outlet />;
}
