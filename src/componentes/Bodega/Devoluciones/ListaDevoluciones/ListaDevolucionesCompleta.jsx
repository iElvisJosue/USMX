/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDevolucionesPorFiltro from "../../../../hooks/Bodega/Devoluciones/useBuscarDevolucionesPorFiltro";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/Devoluciones/ListaDevoluciones/ListaDevolucionesCompleta.css";

export default function ListaDevolucionesCompleta({
  Idioma,
  EstablecerLosDetallesDeLaDevolucion,
}) {
  const { devoluciones, cargando, filtro, establecerFiltro } =
    useBuscarDevolucionesPorFiltro();

  const BuscarDevoluciones = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  const FormatearFechaDeLasDevoluciones = () => {
    devoluciones.map(
      (devolucion) =>
        (devolucion.FechaCreacionDevolucion = FormatearFecha(
          devolucion.FechaCreacionDevolucion.slice(0, 10)
        ))
    );
    return devoluciones;
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaDevolucionesCompleta">
      <h1 className="ListaDevolucionesCompleta__Titulo">
        {
          DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma]
            .ListaCompletaDeDevoluciones
        }
      </h1>
      <span className="ListaDevolucionesCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma].BuscarDevolucion
          }
          onChange={BuscarDevoluciones}
        />
        <span className="ListaDevolucionesCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {devoluciones.length > 0 ? (
        <>
          <small className="ListaDevolucionesCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {devoluciones.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Rojo"
            ContenidoTabla={FormatearFechaDeLasDevoluciones()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto:
                  DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma].idDevolucion,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idDevolucion",
              },
              {
                TextoUno: "CantidadDevoluciones",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionDevolucion",
                TextoDos: "HoraCreacionDevolucion",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDeLaDevolucion,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: true,
                    ColorBoton: "Rojo",
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
