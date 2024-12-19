/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarEntradasABodegaPorFiltro from "../../../../hooks/Bodega/Entradas/useBuscarEntradasABodegaPorFiltro";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_ENTRADAS_COMPLETA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/EntradasBodega/ListaDeTodasLasEntradas/ListaEntradasCompleta.css";

export default function ListaEntradasCompleta({
  Idioma,
  EstablecerLosDetallesDeLaEntrada,
}) {
  const { entradas, cargando, filtro, establecerFiltro } =
    useBuscarEntradasABodegaPorFiltro();

  const BuscarEntradas = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  const FormatearFechaDeLasEntradas = () => {
    entradas.map(
      (entrada) =>
        (entrada.FechaCreacionEntrada = FormatearFecha(
          entrada.FechaCreacionEntrada.slice(0, 10)
        ))
    );
    return entradas;
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaEntradasCompleta">
      <h1 className="ListaEntradasCompleta__Titulo">
        {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].ListaCompletaDeEntradas}
      </h1>
      <span className="ListaEntradasCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].BuscarEntrada
          }
          onChange={BuscarEntradas}
        />
        <span className="ListaEntradasCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {entradas.length > 0 ? (
        <>
          <small className="ListaEntradasCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {entradas.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Negro"
            ContenidoTabla={FormatearFechaDeLasEntradas()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto: DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].idEntrada,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].Acciones,
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
                    Completa: true,
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
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
