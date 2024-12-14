/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarRecoleccionesPorFiltro from "../../../hooks/Recolecciones/useBuscarRecoleccionesPorFiltro";

// COMPONENTES A USAR
import Tabla from "../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA,
  DICCIONARIO_RESULTADOS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Recolecciones/ListaRecolecciones/ListaRecoleccionesCompleta.css";

export default function ListaRecoleccionesCompleta({
  Idioma,
  EstablecerLosDetallesDeLaRecoleccion,
}) {
  const { recolecciones, cargando, filtro, establecerFiltro } =
    useBuscarRecoleccionesPorFiltro();

  const BuscarRecolecciones = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  const FormatearFechaDeLasRecolecciones = () => {
    recolecciones.map(
      (recoleccion) =>
        (recoleccion.FechaCreacionRecoleccion = FormatearFecha(
          recoleccion.FechaCreacionRecoleccion.slice(0, 10)
        ))
    );
    return recolecciones;
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaRecoleccionesCompleta">
      <h1 className="ListaRecoleccionesCompleta__Titulo">
        {
          DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma]
            .ListaCompletaDeRecolecciones
        }
      </h1>
      <span className="ListaRecoleccionesCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].BuscarRecoleccion
          }
          onChange={BuscarRecolecciones}
        />
        <span className="ListaRecoleccionesCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {recolecciones.length > 0 ? (
        <>
          <small className="ListaRecoleccionesCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {recolecciones.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ContenidoTabla={FormatearFechaDeLasRecolecciones()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma]
                    .idRecoleccion,
              },
              {
                Icono: "apps",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma]
                    .FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idRecoleccion",
              },
              {
                TextoUno: "CantidadRecoleccion",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionRecoleccion",
                TextoDos: "HoraCreacionRecoleccion",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDeLaRecoleccion,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: true,
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
