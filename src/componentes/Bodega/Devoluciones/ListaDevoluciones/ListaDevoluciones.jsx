/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDevolucionesCompleta from "./ListaDevolucionesCompleta";
import ListaDevolucionesPorFecha from "./ListaDevolucionesPorFecha";
import DetallesDevolucion from "./DetallesDevolucion";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/Devoluciones/ListaDevoluciones/ListaDevoluciones.css";

export default function ListaDevoluciones({ idioma }) {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [informacionDeLaDevolucion, establecerInformacionDeLaDevolucion] =
    useState(null);

  const EstablecerLosDetallesDeLaDevolucion = (Devolucion, esCompleta) => {
    establecerInformacionDeLaDevolucion(Devolucion);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    esCompleta,
    establecerVista,
    informacionDeLaDevolucion,
    establecerInformacionDeLaDevolucion,
    EstablecerLosDetallesDeLaDevolucion,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDevolucionesCompleta,
    1: ListaDevolucionesPorFecha,
    2: DetallesDevolucion,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaDeLasDevoluciones">
      {vista < 2 && (
        <span className="ListaDeLasDevoluciones__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaDeLasDevoluciones__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaDeLasDevoluciones__Opciones--Boton ListaCompleta"
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
