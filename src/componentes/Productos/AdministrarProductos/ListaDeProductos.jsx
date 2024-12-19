/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_LISTA_DE_PRODUCTOS,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import AdministrarRegistro from "../../Globales/AdministrarRegistro";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarProductosPorFiltro from "../../../hooks/Productos/useBuscarProductosPorFiltro";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ListaDeProductos.css";

export default function ListaDeProductos({
  Idioma,
  establecerVistaProductos,
  establecerInformacionDelProducto,
}) {
  const {
    productos,
    cargandoProductos,
    establecerFiltroProductos,
    buscarProductosNuevamente,
    establecerBuscarProductosNuevamente,
  } = useBuscarProductosPorFiltro();
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
  const { ActualizarEstadoDeUnProducto } = useProductos();

  useEffect(() => {
    if (productos) {
      const cantidadDePaginasEnProductos = Math.ceil(
        productos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnProductos);
    }
  }, [productos]);

  const ObtenerLosProductos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroProductos(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstablecerInformacionDelProductoSeleccionado = (infProducto) => {
    establecerInformacionDelProducto(infProducto);
    establecerVistaProductos(1);
  };
  const EstablecerInformacionDelProductoAEditar = (infProducto) => {
    establecerInformacionDelProducto(infProducto);
    establecerVistaProductos(2);
  };

  if (cargandoProductos) return <Cargando />;

  return (
    <div className="ListaDeProductos">
      <h1 className="ListaDeProductos__Titulo">
        {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].AdministrarProductos}
      </h1>
      <span className="ListaDeProductos__Buscar">
        <input
          type="text"
          placeholder={DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].BuscarProducto}
          onChange={ObtenerLosProductos}
        />
        <span className="ListaDeProductos__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {productos.length > 0 ? (
        <>
          <small className="ListaDeProductos__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {productos.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <h2 className="ListaDeProductos__Clasificacion">
            {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].EstatusDeLosProductos}
          </h2>
          <span className="ListaDeProductos__Colores">
            <p className="ListaDeProductos__Clasificacion--Texto Activa">
              <ion-icon name="basket"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].Activo}
            </p>
            <p className="ListaDeProductos__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].Desactivado}
            </p>
          </span>
          <div className="ListaDeProductos__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeProductos__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < productos.length && (
              <button
                className="ListaDeProductos__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {productos.slice(indiceInicial, indiceFinal).map((infProducto) => (
            <AdministrarRegistro
              key={infProducto.idProducto}
              Status={infProducto.StatusProducto}
              idRegistro={infProducto.idProducto}
              NombreRegistro={infProducto.NombreProducto}
              Secciones={[
                {
                  Icono: "basket",
                  TextoUno: infProducto.NombreProducto,
                },
              ]}
              OpcionesBotones={[
                {
                  TituloBoton: "Agencias",
                  IconoBoton: "Business",
                  ColorBoton: "Verde",
                  FuncionBoton: EstablecerInformacionDelProductoSeleccionado,
                },
                {
                  TituloBoton: "Editar",
                  IconoBoton: "create",
                  ColorBoton: "Azul",
                  FuncionBoton: EstablecerInformacionDelProductoAEditar,
                },
              ]}
              infRegistro={infProducto}
              FuncionActivarDesactivar={ActualizarEstadoDeUnProducto}
              obtenerListaNuevamente={buscarProductosNuevamente}
              establecerObtenerListaNuevamente={
                establecerBuscarProductosNuevamente
              }
            />
          ))}

          <small className="ListaDeProductos__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
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
