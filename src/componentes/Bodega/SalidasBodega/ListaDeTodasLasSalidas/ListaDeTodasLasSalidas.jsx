/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaSalidasCompleta from "./ListaSalidasCompleta";
import ListaSalidasPorFecha from "./ListaSalidasPorFecha";
import DetallesSalida from "./DetallesSalida";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaDeTodasLasSalidas.css";

export default function ListaDeTodasLasSalidas({ idioma }) {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [informacionSalida, establecerInformacionDeLaSalida] = useState(null);

  const EstablecerLosDetallesDeLaSalida = (Salida, esCompleta) => {
    establecerInformacionDeLaSalida(Salida);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    esCompleta,
    establecerVista,
    informacionSalida,
    establecerInformacionDeLaSalida,
    EstablecerLosDetallesDeLaSalida,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaSalidasCompleta,
    1: ListaSalidasPorFecha,
    2: DetallesSalida,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaDeTodasLasSalidas">
      {vista < 2 && (
        <span className="ListaDeTodasLasSalidas__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaDeTodasLasSalidas__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaDeTodasLasSalidas__Opciones--Boton ListaCompleta"
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
