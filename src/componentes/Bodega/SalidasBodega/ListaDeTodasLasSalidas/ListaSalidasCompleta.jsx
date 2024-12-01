/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarSalidasABodegaPorFiltro from "../../../../hooks/Bodega/Salidas/useBuscarSalidasABodegaPorFiltro";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_SALIDAS_COMPLETA,
  DICCIONARIO_RESULTADOS,
  // DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaSalidasCompleta.css";

export default function ListaSalidasCompleta({
  idioma,
  // EstablecerLosDetallesDeLaSalida,
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

  if (cargando) return <Cargando />;

  return (
    <div className="ListaSalidasCompleta">
      <h1 className="ListaSalidasCompleta__Titulo">
        {DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].ListaCompletaDeSalidas}
      </h1>
      <span className="ListaSalidasCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].BuscarSalida}
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
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos} {salidas.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaSalidasCompleta__Cuerpo">
            <table className="ListaSalidasCompleta__Cuerpo__Tabla">
              <thead className="ListaSalidasCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].idSalida}
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].FechaCreacion}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaSalidasCompleta__Cuerpo__Tabla__Cuerpo">
                {salidas.map((infSalida, index) => (
                  <tr key={index}>
                    <td>{infSalida.idSalidaBodega}</td>
                    <td>{infSalida.CantidadSalidas}</td>
                    <td>{infSalida.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        infSalida.FechaCreacionSalida.slice(0, 10)
                      )}{" "}
                      {infSalida.HoraCreacionSalida}
                    </td>
                    {/* <td>
                      <button
                        className="ListaSalidasCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaSalida(infSalida)
                        }
                      >
                        {DICCIONARIO_BOTONES[idioma].Ver}
                      </button>
                    </td> */}
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
          UrlBoton={"/Bodega-Salidas"}
          TextoBoton={DICCIONARIO_LISTA_SALIDAS_COMPLETA[idioma].CrearSalida}
        />
      )}
    </div>
  );
}
