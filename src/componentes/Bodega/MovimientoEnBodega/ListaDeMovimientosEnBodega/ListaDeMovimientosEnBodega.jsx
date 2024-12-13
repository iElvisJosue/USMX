/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeMovimientosEnBodegaCompleta from "./ListaDeMovimientosEnBodegaCompleta";
import ListaDeMovimientosEnBodegaPorFecha from "./ListaDeMovimientosEnBodegaPorFecha";
import DetallesMovimientoEnBodega from "./DetallesMovimientoEnBodega";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/ListaDeMovimientosEnBodega/ListaDeMovimientosEnBodega.css";

export default function ListaDeMovimientosEnBodega({ Idioma }) {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [informacionDelMovimiento, establecerInformacionDelMovimiento] =
    useState(null);

  const EstablecerLosDetallesDelMovimiento = (Movimiento, esCompleta) => {
    establecerInformacionDelMovimiento(Movimiento);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
    esCompleta,
    establecerVista,
    informacionDelMovimiento,
    establecerInformacionDelMovimiento,
    EstablecerLosDetallesDelMovimiento,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeMovimientosEnBodegaCompleta,
    1: ListaDeMovimientosEnBodegaPorFecha,
    2: DetallesMovimientoEnBodega,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaDeMovimientosEnBodega">
      {vista < 2 && (
        <span className="ListaDeMovimientosEnBodega__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaDeMovimientosEnBodega__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaDeMovimientosEnBodega__Opciones--Boton ListaCompleta"
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
