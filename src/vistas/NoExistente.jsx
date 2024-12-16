import { useNavigate } from "react-router-dom";
import "../estilos/vistas/NoExistente.css";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Redirige a la página anterior
  };

  return (
    <main className="NoExistente">
      <img src="NoExistente.png" alt="Pagina no encontrada" />
      <h1>404 - Página no encontrada</h1>
      <p>La ruta a la que intentaste acceder no existe.</p>
      <button onClick={goBack}>Regresar</button>
    </main>
  );
}
