/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarRecoleccionesPorFiltro from "../../../hooks/Recolecciones/useBuscarRecoleccionesPorFiltro";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
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
          <div className="ListaRecoleccionesCompleta__Cuerpo">
            <table className="ListaRecoleccionesCompleta__Cuerpo__Tabla">
              <thead className="ListaRecoleccionesCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma]
                        .idRecoleccion
                    }
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma]
                        .FechaCreacion
                    }
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaRecoleccionesCompleta__Cuerpo__Tabla__Cuerpo">
                {recolecciones.map((recoleccion, index) => (
                  <tr key={index}>
                    <td>{recoleccion.idRecoleccion}</td>
                    <td>{recoleccion.CantidadRecoleccion}</td>
                    <td>{recoleccion.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        recoleccion.FechaCreacionRecoleccion.slice(0, 10)
                      )}{" "}
                      {recoleccion.HoraCreacionRecoleccion}
                    </td>
                    <td>
                      <button
                        className="ListaRecoleccionesCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaRecoleccion(
                            recoleccion,
                            true
                          )
                        }
                      >
                        {DICCIONARIO_BOTONES[Idioma].Ver}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Recolecciones"}
          TextoBoton={
            DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA[Idioma].CrearRecoleccion
          }
        />
      )}
    </div>
  );
}
