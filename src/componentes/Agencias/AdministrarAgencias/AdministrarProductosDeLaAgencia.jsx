/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERías A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import ModalInformacionDelProducto from "./ModalInformacionDelProducto";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarProductosAsignadosYNoAsignadosPorAgencia from "../../../hooks/Agencias/useBuscarProductosAsignadosYNoAsignadosPorAgencia";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/AdministrarProductosDeLaAgencia.css";

export default function AdministrarProductosDeLaAgencia({
  Idioma,
  informacionDeLaAgencia,
  establecerVista,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [informacionDelProducto, establecerInformacionDelProducto] =
    useState(null);
  const [mostrarModal, establecerMostrarModal] = useState(false);
  const { DesasignarProductoAgencia } = useAgencias();
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

  const {
    productosAsignadosYNoAsignadosPorAgencia,
    cargandoProductosAsignadosYNoAsignadosPorAgencia,
    establecerFiltroProductosAsignadosYNoAsignadosPorAgencia,
    buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
    establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  } = useBuscarProductosAsignadosYNoAsignadosPorAgencia(
    informacionDeLaAgencia.idAgencia
  );

  useEffect(() => {
    if (productosAsignadosYNoAsignadosPorAgencia) {
      const { ProductosNoAsignados } = productosAsignadosYNoAsignadosPorAgencia;
      const cantidadDePaginasEnProductos = Math.ceil(
        ProductosNoAsignados.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnProductos);
    }
  }, [productosAsignadosYNoAsignadosPorAgencia]);

  const obtenerProductos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroProductosAsignadosYNoAsignadosPorAgencia(
        valorIntroducido
      );
      reiniciarValores();
    }
  };

  const MostrarModalYAsignarProducto = (infProducto, Editable, Actualizar) => {
    // infProducto.Actualizar ES PARA PODER ACTUALIZAR LA INFORMACION DE UN PRODUCTO ASIGNADO
    infProducto.Actualizar = Actualizar;
    // infProducto.Editable ES PARA ASIGNAR UN PRODUCTO A UNA AGENCIA
    infProducto.Editable = Editable;
    establecerMostrarModal(true);
    establecerInformacionDelProducto(infProducto);
  };

  const PeticionDesasignarProductoAgencia = async (
    idUnionAgenciasProductos
  ) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await DesasignarProductoAgencia({
        idUnionAgenciasProductos,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia(
          !buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
        );
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  };

  if (cargandoProductosAsignadosYNoAsignadosPorAgencia) return <Cargando />;

  const { ProductosAsignados, ProductosNoAsignados } =
    productosAsignadosYNoAsignadosPorAgencia;

  return (
    <div className="AdministrarProductosDeLaAgencia">
      {mostrarModal && (
        <ModalInformacionDelProducto
          Idioma={Idioma}
          agencia={informacionDeLaAgencia}
          informacionDelProducto={informacionDelProducto}
          establecerMostrarModal={establecerMostrarModal}
          buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia={
            buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
          }
          establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia={
            establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
          }
        />
      )}
      <span className="AdministrarProductosDeLaAgencia__Regresar">
        <button
          className="AdministrarProductosDeLaAgencia__Regresar__Boton"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <small className="AdministrarProductosDeLaAgencia__Regresar__Usuario">
          {
            DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA[Idioma]
              .AgenciaSeleccionada
          }{" "}
          <b>{informacionDeLaAgencia.NombreAgencia.toUpperCase()}</b>
        </small>
      </span>
      {ProductosAsignados.length > 0 && (
        <>
          <h1 className="AdministrarProductosDeLaAgencia__Titulo">
            {
              DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA[Idioma]
                .ProductosAsignados
            }
          </h1>
          {ProductosAsignados.map((infProducto, index) => (
            <section
              className="AdministrarProductosDeLaAgencia__Agencia Asignadas"
              key={index}
            >
              <ion-icon name="basket"></ion-icon>
              <p>{infProducto.NombreProducto}</p>
              <button
                className="AdministrarProductosDeLaAgencia__Agencia__Eliminar"
                onClick={() =>
                  PeticionDesasignarProductoAgencia(
                    infProducto.idUnionAgenciasProductos
                  )
                }
              >
                <ion-icon name="close"></ion-icon>
              </button>
              <button
                className="AdministrarProductosDeLaAgencia__Agencia__Detalles Editar"
                onClick={() =>
                  MostrarModalYAsignarProducto(infProducto, true, true)
                }
              >
                <ion-icon name="color-wand"></ion-icon>
              </button>
              <button
                className="AdministrarProductosDeLaAgencia__Agencia__Detalles Informacion"
                onClick={() =>
                  MostrarModalYAsignarProducto(infProducto, false, false)
                }
              >
                <ion-icon name="information"></ion-icon>
              </button>
            </section>
          ))}
        </>
      )}

      <h1 className="AdministrarProductosDeLaAgencia__Titulo">
        {
          DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA[Idioma]
            .AsignarNuevoProducto
        }
      </h1>
      <span className="AdministrarProductosDeLaAgencia__Buscar">
        <input
          type="text"
          placeholder={
            DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA[Idioma]
              .BuscarProducto
          }
          onChange={obtenerProductos}
        />
        <span className="AdministrarProductosDeLaAgencia__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ProductosNoAsignados.length > 0 ? (
        <>
          <small className="AdministrarProductosDeLaAgencia__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos}{" "}
            {ProductosNoAsignados.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="AdministrarProductosDeLaAgencia__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="AdministrarProductosDeLaAgencia__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < ProductosNoAsignados.length && (
              <button
                className="AdministrarProductosDeLaAgencia__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {ProductosNoAsignados.slice(indiceInicial, indiceFinal).map(
            (infProducto, index) => (
              <section
                className="AdministrarProductosDeLaAgencia__Agencia"
                key={index}
                onClick={() =>
                  MostrarModalYAsignarProducto(infProducto, true, false)
                }
              >
                <ion-icon name="basket"></ion-icon>
                <p>{infProducto.NombreProducto}</p>
              </section>
            )
          )}
          <small className="AdministrarProductosDeLaAgencia__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Productos"}
          TextoBoton={
            DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA[Idioma]
              .RegistrarProducto
          }
        />
      )}
    </div>
  );
}
