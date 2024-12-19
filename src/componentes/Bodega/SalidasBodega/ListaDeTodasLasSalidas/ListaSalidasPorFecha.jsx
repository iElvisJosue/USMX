/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarSalidasABodegaPorFecha from "../../../../hooks/Bodega/Salidas/useBuscarSalidasABodegaPorFecha";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_SALIDAS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaSalidasPorFecha.css";

export default function ListaSalidasPorFecha({
  Idioma,
  EstablecerLosDetallesDeLaSalida,
}) {
  const {
    salidasPorFecha,
    cargandoSalidasPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarSalidasABodegaPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  const FormatearFechaDeLasSalidas = () => {
    salidasPorFecha.map(
      (salida) =>
        (salida.FechaCreacionSalida = FormatearFecha(
          salida.FechaCreacionSalida.slice(0, 10)
        ))
    );
    return salidasPorFecha;
  };

  if (cargandoSalidasPorFecha) return <Cargando />;

  return (
    <div className="ListaSalidasPorFecha">
      <h1 className="ListaSalidasPorFecha__Titulo">
        {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].BuscarSalidasPorFecha}
        <small className="ListaSalidasPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaSalidasPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaSalidasPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaSalidasPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {salidasPorFecha.length > 0 ? (
        <>
          <small className="ListaSalidasPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {salidasPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Negro"
            ContenidoTabla={FormatearFechaDeLasSalidas()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto: DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].idSalida,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idSalidaBodega",
              },
              {
                TextoUno: "CantidadSalidas",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionSalida",
                TextoDos: "HoraCreacionSalida",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDeLaSalida,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: false,
                    ColorBoton: "Negro",
                  },
                ],
              },
            ]}
          />
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`${
            DICCIONARIO_RESULTADOS[Idioma].NoResultadoPorFecha
          } ${primeraFecha.split("-").reverse().join("/")} - ${segundaFecha
            .split("-")
            .reverse()
            .join("/")}.`}
        />
      )}
    </div>
  );
}
