/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../../context/OcurreContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import AdministrarRegistro from "../../Globales/AdministrarRegistro";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOcurresPorFiltro from "../../../hooks/Ocurres/useBuscarOcurresPorFiltro";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DE_OCURRES,
  DICCIONARIO_RESULTADOS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ocurres/AdministrarOcurres/ListaDeOcurres.css";

export default function ListaDeOcurres({
  Idioma,
  establecerVistaOcurres,
  establecerInformacionDelOcurre,
}) {
  const {
    ocurres,
    cargandoOcurres,
    establecerFiltroOcurres,
    obtenerOcurresNuevamente,
    establecerObtenerOcurresNuevamente,
  } = useBuscarOcurresPorFiltro();
  const {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  } = usePaginacion();
  const { ActualizarEstadoOcurre } = useOcurre();

  useEffect(() => {
    if (ocurres) {
      const cantidadDePaginasEnOcurres = Math.ceil(
        ocurres.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnOcurres);
    }
  }, [ocurres]);

  const ObtenerLasOcurrencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroOcurres(valorIntroducido);
      reiniciarValores();
    }
  };
  const EstablecerInformacionDelOcurreAEditar = (infOcurre) => {
    establecerInformacionDelOcurre(infOcurre);
    establecerVistaOcurres(1);
  };

  if (cargandoOcurres) return <Cargando />;

  return (
    <div className="ListaDeOcurres">
      <h1 className="ListaDeOcurres__Titulo">
        {DICCIONARIO_LISTA_DE_OCURRES[Idioma].AdministrarOcurres}
      </h1>
      <span className="ListaDeOcurres__Buscar">
        <input
          type="text"
          placeholder={DICCIONARIO_LISTA_DE_OCURRES[Idioma].BuscarOcurre}
          onChange={ObtenerLasOcurrencias}
        />
        <span className="ListaDeOcurres__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ocurres.length > 0 ? (
        <>
          <small className="ListaDeOcurres__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {ocurres.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <h2 className="ListaDeOcurres__Clasificacion">
            {DICCIONARIO_LISTA_DE_OCURRES[Idioma].EstatusDeLosOcurre}
          </h2>
          <span className="ListaDeOcurres__Colores">
            <p className="ListaDeOcurres__Clasificacion--Texto Activa">
              <ion-icon name="alert-circle"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_OCURRES[Idioma].Activo}
            </p>
            <p className="ListaDeOcurres__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_OCURRES[Idioma].Desactivado}
            </p>
          </span>
          <div className="ListaDeOcurres__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeOcurres__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < ocurres.length && (
              <button
                className="ListaDeOcurres__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {ocurres.slice(indiceInicial, indiceFinal).map((infOcurre) => (
            <AdministrarRegistro
              key={infOcurre.idOcurre}
              Status={infOcurre.StatusOcurre}
              idRegistro={infOcurre.idOcurre}
              NombreRegistro={infOcurre.NombreOcurre}
              Secciones={[
                {
                  Icono: "alert-circle",
                  TextoUno: infOcurre.NombreOcurre,
                },
                {
                  Icono: "business",
                  TextoUno: infOcurre.OperadorLogisticoOcurre,
                },
                {
                  Icono: "location",
                  TextoUno: infOcurre.PaisOcurre,
                  TextoDos: `${infOcurre.EstadoOcurre}, ${infOcurre.CiudadOcurre}`,
                },
                {
                  TextoUno: `${infOcurre.DireccionOcurre}, ${infOcurre.CodigoPostalOcurre}`,
                },
              ]}
              OpcionesBotones={[
                {
                  TituloBoton: "Editar",
                  IconoBoton: "create",
                  ColorBoton: "Azul",
                  FuncionBoton: EstablecerInformacionDelOcurreAEditar,
                },
              ]}
              infRegistro={infOcurre}
              FuncionActivarDesactivar={ActualizarEstadoOcurre}
              obtenerListaNuevamente={obtenerOcurresNuevamente}
              establecerObtenerListaNuevamente={
                establecerObtenerOcurresNuevamente
              }
            />
          ))}
          <small className="ListaDeOcurres__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
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
