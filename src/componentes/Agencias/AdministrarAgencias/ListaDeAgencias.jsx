/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import ModalSubirArchivo from "./ModalSubirArchivo";
import AdministrarRegistro from "../../Globales/AdministrarRegistro";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasPorFiltro from "../../../hooks/Agencias/useBuscarAgenciasPorFiltro";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  ObtenerFechaActual,
  ObtenerHoraActual,
} from "../../../helpers/FuncionesGenerales";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DE_AGENCIAS,
  DICCIONARIO_BOTONES,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ListaDeAgencias.css";

export default function ListaDeAgencias({
  Idioma,
  establecerVista,
  establecerInformacionDeLaAgencia,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { CrearYDescargarExcelDeAgencias, ActualizarEstadoAgencia } =
    useAgencias();
  const [mostrarModalSubirArchivo, establecerMostrarModalSubirArchivo] =
    useState(false);
  const [informacionArchivo, establecerInformacionArchivo] = useState(null);
  const {
    agencias,
    cargandoAgencias,
    establecerFiltroAgencias,
    obtenerAgenciasNuevamente,
    establecerObtenerAgenciasNuevamente,
  } = useBuscarAgenciasPorFiltro();
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
  useEffect(() => {
    if (agencias) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        agencias.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [agencias]);
  const ObtenerLasAgencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgencias(valorIntroducido);
      reiniciarValores();
    }
  };
  const EstablecerInformacionDeLaAgenciaSeleccionada = (infAgencia) => {
    establecerInformacionDeLaAgencia(infAgencia);
    establecerVista(1);
  };
  const EstablecerInformacionDeLaAgenciaAEditar = (infAgencia) => {
    establecerInformacionDeLaAgencia(infAgencia);
    establecerVista(2);
  };
  const EstablecerAgenciasParaElExcel = async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    const solicitudPromise = CrearYDescargarExcelDeAgencias({
      Agencias: agencias,
    });
    toast.promise(solicitudPromise, {
      loading: "Generando archivo Excel...",
      success:
        "¡El archivo Excel fue generado con éxito y está listo para su descarga!",
      error:
        "¡Oops! Parece que ocurrió un error al generar o descargar el archivo.",
      style: {
        borderRadius: "20px",
        fontSize: "16px",
      },
    });

    try {
      const res = await solicitudPromise;
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        // Crear un objeto URL para el blob de datos del archivo
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        // Configurar el enlace para la descarga
        link.href = url;
        link.setAttribute(
          "download",
          `Lista De Agencias ${ObtenerFechaActual()} a las ${FormatearHoraParaArchivoExcel()}.xlsx`
        ); // nombre del archivo a descargar

        // Añadir temporalmente el enlace al DOM y simular un clic
        document.body.appendChild(link);
        link.click();

        // Eliminar el enlace del DOM después de la descarga
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  };
  const FormatearHoraParaArchivoExcel = () => {
    const HoraActual = ObtenerHoraActual();
    const Hora = parseInt(HoraActual.split(":")[0], 10); // Convertir a número
    if (Hora < 12) {
      return `${HoraActual.replace(/:/g, ".")} AM`;
    } else {
      return `${HoraActual.replace(/:/g, ".")} PM`;
    }
  };
  const EstablecerInformacionParaElTipoDeArchivo = (Agencia) => {
    establecerInformacionArchivo({
      idAgencia: Agencia.idAgencia,
      NombreAgencia: Agencia.NombreAgencia,
    });
    establecerMostrarModalSubirArchivo(true);
  };

  if (cargandoAgencias) return <Cargando />;

  return (
    <div className="ListaDeAgencias">
      {mostrarModalSubirArchivo && (
        <ModalSubirArchivo
          Idioma={Idioma}
          informacionArchivo={informacionArchivo}
          establecerMostrarModalSubirArchivo={
            establecerMostrarModalSubirArchivo
          }
        />
      )}
      <h1 className="ListaDeAgencias__Titulo">
        {DICCIONARIO_LISTA_DE_AGENCIAS[Idioma].AdministrarAgencias}
      </h1>
      <span className="ListaDeAgencias__Buscar">
        <input
          type="text"
          placeholder={DICCIONARIO_LISTA_DE_AGENCIAS[Idioma].BuscarAgencia}
          onChange={ObtenerLasAgencias}
        />
        <span className="ListaDeAgencias__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {agencias.length > 0 ? (
        <div className="ListaDeAgencias__Contenedor">
          <small className="ListaDeAgencias__Contenedor__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {agencias.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}
          </small>
          <h2 className="ListaDeAgencias__Contenedor__Clasificacion">
            {DICCIONARIO_LISTA_DE_AGENCIAS[Idioma].EstatusDeLasAgencia}
          </h2>
          <span className="ListaDeAgencias__Contenedor__Colores">
            <p className="ListaDeAgencias__Contenedor__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_AGENCIAS[Idioma].Activa}
            </p>
            <p className="ListaDeAgencias__Contenedor__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_AGENCIAS[Idioma].Desactivada}
            </p>
          </span>
          <h2 className="ListaDeAgencias__Contenedor__Operaciones">
            {DICCIONARIO_LISTA_DE_AGENCIAS[Idioma].Operaciones}
          </h2>
          <span className="ListaDeAgencias__Contenedor__Colores">
            <button
              className="ListaDeAgencias__Contenedor__Operaciones--Boton DescargarExcel"
              onClick={EstablecerAgenciasParaElExcel}
            >
              <ion-icon name="download"></ion-icon>{" "}
              {DICCIONARIO_BOTONES[Idioma].DescargarExcel}
            </button>
          </span>
          <div className="ListaDeAgencias__Contenedor__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeAgencias__Contenedor__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < agencias.length && (
              <button
                className="ListaDeAgencias__Contenedor__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {agencias.slice(indiceInicial, indiceFinal).map((infAgencia) => (
            <AdministrarRegistro
              key={infAgencia.idAgencia}
              Status={infAgencia.StatusAgencia}
              idRegistro={infAgencia.idAgencia}
              NombreRegistro={infAgencia.NombreAgencia}
              Secciones={[
                {
                  Icono: "business",
                  TextoUno: infAgencia.idEspecial,
                  TextoDos: infAgencia.NombreAgencia,
                },
                {
                  Icono: "earth",
                  TextoUno: infAgencia.PaisAgencia,
                },
                {
                  Icono: "location",
                  TextoUno: `${infAgencia.EstadoAgencia}, ${infAgencia.CiudadAgencia}`,
                  TextoDos: `${infAgencia.DireccionAgencia}, ${infAgencia.CodigoPostalAgencia}`,
                },
              ]}
              OpcionesBotones={[
                {
                  TituloBoton: "Productos",
                  IconoBoton: "basket",
                  ColorBoton: "Verde",
                  FuncionBoton: EstablecerInformacionDeLaAgenciaSeleccionada,
                },
                {
                  TituloBoton: "Editar",
                  IconoBoton: "create",
                  ColorBoton: "Azul",
                  FuncionBoton: EstablecerInformacionDeLaAgenciaAEditar,
                },
                {
                  TituloBoton: "Subir Archivo",
                  IconoBoton: "document-attach",
                  ColorBoton: "Blanco",
                  FuncionBoton: EstablecerInformacionParaElTipoDeArchivo,
                },
              ]}
              infRegistro={infAgencia}
              FuncionActivarDesactivar={ActualizarEstadoAgencia}
              obtenerListaNuevamente={obtenerAgenciasNuevamente}
              establecerObtenerListaNuevamente={
                establecerObtenerAgenciasNuevamente
              }
              MostrarBotonActivarDesactivar={
                infAgencia.NombreAgencia !== "USMX Express" ? true : false
              }
            />
          ))}
          <small className="ListaDeAgencias__Contenedor__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
          </small>
        </div>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
