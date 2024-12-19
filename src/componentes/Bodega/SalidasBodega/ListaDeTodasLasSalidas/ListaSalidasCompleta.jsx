/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarSalidasABodegaPorFiltro from "../../../../hooks/Bodega/Salidas/useBuscarSalidasABodegaPorFiltro";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_SALIDAS_COMPLETA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaSalidasCompleta.css";

export default function ListaSalidasCompleta({
  Idioma,
  EstablecerLosDetallesDeLaSalida,
}) {
  const { salidas, cargando, filtro, establecerFiltro } =
    useBuscarSalidasABodegaPorFiltro();

  const BuscarSalidas = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  const FormatearFechaDeLasSalidas = () => {
    salidas.map(
      (salida) =>
        (salida.FechaCreacionSalida = FormatearFecha(
          salida.FechaCreacionSalida.slice(0, 10)
        ))
    );
    return salidas;
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaSalidasCompleta">
      <h1 className="ListaSalidasCompleta__Titulo">
        {DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].ListaCompletaDeSalidas}
      </h1>
      <span className="ListaSalidasCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].BuscarSalida}
          onChange={BuscarSalidas}
        />
        <span className="ListaSalidasCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {salidas.length > 0 ? (
        <>
          <small className="ListaSalidasCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {salidas.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Negro"
            ContenidoTabla={FormatearFechaDeLasSalidas()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto: DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].idSalida,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto: DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_SALIDAS_COMPLETA[Idioma].Acciones,
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
