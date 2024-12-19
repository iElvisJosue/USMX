/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarEntradasABodegaPorFecha from "../../../../hooks/Bodega/Entradas/useBuscarEntradasABodegaPorFecha";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_ENTRADAS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/EntradasBodega/ListaDeTodasLasEntradas/ListaEntradasPorFecha.css";

export default function ListaEntradasPorFecha({
  Idioma,
  EstablecerLosDetallesDeLaEntrada,
}) {
  const {
    entradasPorFecha,
    cargandoEntradasPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarEntradasABodegaPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  const FormatearFechaDeLasEntradas = () => {
    entradasPorFecha.map(
      (entrada) =>
        (entrada.FechaCreacionEntrada = FormatearFecha(
          entrada.FechaCreacionEntrada.slice(0, 10)
        ))
    );
    return entradasPorFecha;
  };

  if (cargandoEntradasPorFecha) return <Cargando />;

  return (
    <div className="ListaEntradasPorFecha">
      <h1 className="ListaEntradasPorFecha__Titulo">
        {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[Idioma].BuscarEntradasPorFecha}
        <small className="ListaEntradasPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaEntradasPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaEntradasPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaEntradasPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {entradasPorFecha.length > 0 ? (
        <>
          <small className="ListaEntradasPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {entradasPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Negro"
            ContenidoTabla={FormatearFechaDeLasEntradas()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto: DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[Idioma].idEntrada,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idEntradaBodega",
              },
              {
                TextoUno: "CantidadEntradas",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionEntrada",
                TextoDos: "HoraCreacionEntrada",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDeLaEntrada,
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
