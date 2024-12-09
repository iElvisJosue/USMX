/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDevolucionesPorFiltro from "../../../../hooks/Bodega/Devoluciones/useBuscarDevolucionesPorFiltro";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/Devoluciones/ListaDevoluciones/ListaDevolucionesCompleta.css";

export default function ListaDevolucionesCompleta({
  idioma,
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

  if (cargando) return <Cargando />;

  return (
    <div className="ListaDevolucionesCompleta">
      <h1 className="ListaDevolucionesCompleta__Titulo">
        {
          DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma]
            .ListaCompletaDeDevoluciones
        }
      </h1>
      <span className="ListaDevolucionesCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma].BuscarDevolucion
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
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos} {devoluciones.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaDevolucionesCompleta__Cuerpo">
            <table className="ListaDevolucionesCompleta__Cuerpo__Tabla">
              <thead className="ListaDevolucionesCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma]
                        .idDevolucion
                    }
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma]
                        .FechaCreacion
                    }
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaDevolucionesCompleta__Cuerpo__Tabla__Cuerpo">
                {devoluciones.map((devolucion, index) => (
                  <tr key={index}>
                    <td>{devolucion.idDevolucion}</td>
                    <td>{devolucion.CantidadDevoluciones}</td>
                    <td>{devolucion.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        devolucion.FechaCreacionDevolucion.slice(0, 10)
                      )}{" "}
                      {devolucion.HoraCreacionDevolucion}
                    </td>
                    <td>
                      <button
                        className="ListaDevolucionesCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaDevolucion(devolucion, true)
                        }
                      >
                        {DICCIONARIO_BOTONES[idioma].Ver}
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
          Texto={DICCIONARIO_RESULTADOS[idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Bodega-Devoluciones"}
          TextoBoton={
            DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA[idioma].CrearDevolucion
          }
        />
      )}
    </div>
  );
}
