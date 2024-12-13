/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

// IMPORTAMOS LOS ESTILOS
import "../estilos/componentes/MensajeGeneral.css";

export default function MensajeGeneral({
  Imagen,
  Texto,
  Boton = false,
  TipoBoton = "Negro",
  UrlBoton = "",
  TextoBoton = "Botón",
}) {
  const navigate = useNavigate();
  return (
    <section className="MensajeGeneral">
      <img
        src={Imagen}
        alt="No se encontraron resultados"
        className="MensajeGeneral__Imagen"
      />
      <p className="MensajeGeneral__Texto">{Texto}</p>
      {Boton && (
        <button
          className={`MensajeGeneral__Boton ${TipoBoton}`}
          onClick={() => navigate(UrlBoton)}
        >
          {TextoBoton}
        </button>
      )}
    </section>
  );
}
