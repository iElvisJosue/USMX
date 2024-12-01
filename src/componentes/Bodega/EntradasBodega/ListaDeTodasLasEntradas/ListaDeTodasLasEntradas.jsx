/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaEntradasCompleta from "./ListaEntradasCompleta";
import ListaEntradasPorFecha from "./ListaEntradasPorFecha";
// import DetallesPedido from "./DetallesPedido";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/EntradasBodega/ListaDeTodasLasEntradas/ListaDeTodasLasEntradas.css";

export default function ListaDeTodasLasEntradas({ idioma }) {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [detallesEntrada, establecerDetallesEntrada] = useState(null);

  const EstablecerLosDetallesDeLaEntrada = (Devolucion, esCompleta) => {
    establecerDetallesEntrada(Devolucion);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    esCompleta,
    establecerVista,
    detallesEntrada,
    establecerDetallesEntrada,
    EstablecerLosDetallesDeLaEntrada,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaEntradasCompleta,
    1: ListaEntradasPorFecha,
    // 2: DetallesPedido,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaDeTodasLasEntradas">
      {vista < 2 && (
        <span className="ListaDeTodasLasEntradas__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaDeTodasLasEntradas__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaDeTodasLasEntradas__Opciones--Boton ListaCompleta"
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
