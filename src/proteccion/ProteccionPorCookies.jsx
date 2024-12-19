import { Navigate, Outlet } from "react-router-dom";
import { useSistema } from "../context/SistemaContext";
import Cargando from "../componentes/Globales/Cargando";

export default function ProteccionPorCookies() {
  const { cargandoInformacion, tieneCookie } = useSistema();

  if (cargandoInformacion) return <Cargando />;
  if (!tieneCookie) return <Navigate to="/" replace />;

  return <Outlet />;
}
