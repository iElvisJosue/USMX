/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaRecoleccionesCompleta from "./ListaRecoleccionesCompleta";
import ListaRecoleccionesPorFecha from "./ListaRecoleccionesPorFecha";
import DetallesRecoleccion from "./DetallesRecoleccion";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Recolecciones/ListaRecolecciones/ListaRecolecciones.css";

export default function ListaRecolecciones({ idioma }) {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [informacionDeLaRecoleccion, establecerInformacionDeLaRecoleccion] =
    useState(null);

  const EstablecerLosDetallesDeLaRecoleccion = (recoleccion, esCompleta) => {
    establecerInformacionDeLaRecoleccion(recoleccion);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    esCompleta,
    establecerVista,
    informacionDeLaRecoleccion,
    establecerInformacionDeLaRecoleccion,
    EstablecerLosDetallesDeLaRecoleccion,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaRecoleccionesCompleta,
    1: ListaRecoleccionesPorFecha,
    2: DetallesRecoleccion,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaRecolecciones">
      {vista < 2 && (
        <span className="ListaRecolecciones__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaRecolecciones__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaRecolecciones__Opciones--Boton ListaCompleta"
              onClick={() => establecerVista(0)}
            >
              <ion-icon name="list"></ion-icon>
            </button>
          )}
        </span>
      )}
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
