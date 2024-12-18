/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOcurresActivosPorFiltro from "../../../hooks/Pedidos/useBuscarOcurresActivosPorFiltro";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../../helpers/Regexs";
import {
  ESTILOS_SUCCESS,
  ESTILOS_WARNING,
} from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/SeleccionarOcurrePedido.css";
export default function SeleccionarOcurrePedido({
  Idioma,
  establecerVistaDestinatario,
  establecerDestinatario,
  establecerPaso,
  agencia,
  paso,
}) {
  const [infOcurre, establecerInfOcurre] = useState(null);
  const [idOcurreSeleccionado, establecerIdOcurreSeleccionado] = useState(null);
  const {
    ocurresActivos,
    cargandoOcurresActivos,
    establecerFiltroOcurresActivos,
  } = useBuscarOcurresActivosPorFiltro();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (ocurresActivos) {
      const cantidadDePaginasEnOcurresActivos = Math.ceil(
        ocurresActivos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnOcurresActivos);
    }
  }, [ocurresActivos]);

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

  const ObtenerOcurres = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroOcurresActivos(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstablecerElOcurreSeleccionado = (ocurre) => {
    establecerInfOcurre(ocurre);
    establecerIdOcurreSeleccionado(ocurre.idOcurre);
    toast.success(
      `¡La ocurrencia ${ocurre.NombreOcurre.toUpperCase()} ha sido seleccionada con éxito!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
  };

  const GuardaInformacionDeLaOcurrencia = handleSubmit(async (info) => {
    if (idOcurreSeleccionado === null) {
      return toast.error(
        "¡Oops! Parece que no has seleccionado ninguna ocurrencia, por favor seleccione una.",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    // NO PONEMOS EL ID DEL DESTINATARIO COMO FALSO PARA QUE SE ALMACENE EN LA BASE DE DATOS
    // Y PARA QUE NO SE CREE LA UNION CON LA AGENCIA CORRESPONDIENTE
    establecerDestinatario({
      NombreDestinatario: info.NombreDestinatario,
      ApellidosDestinatario: info.ApellidosDestinatario,
      TelefonoUnoDestinatario: infOcurre.TelefonoUnoOcurre,
      TelefonoDosDestinatario: infOcurre.TelefonoDosOcurre,
      CorreoDestinatario: infOcurre.CorreoOcurre,
      PaisDestinatario: infOcurre.PaisOcurre,
      CodigoPaisDestinatario: infOcurre.CodigoPaisOcurre,
      EstadoDestinatario: infOcurre.EstadoOcurre,
      CodigoEstadoDestinatario: infOcurre.CodigoEstadoOcurre,
      CiudadDestinatario: infOcurre.CiudadOcurre,
      CodigoPostalDestinatario: infOcurre.CodigoPostalOcurre,
      DireccionDestinatario: infOcurre.DireccionOcurre,
      ReferenciaDestinatario: infOcurre.ReferenciaOcurre,
    });
    toast.success("¡Paso 2 (Destinatario) completado con éxito!", {
      style: ESTILOS_SUCCESS,
    });
    establecerPaso(paso + 1);
  });

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RealizarPedido__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  if (cargandoOcurresActivos) return <Cargando />;

  return (
    <form
      className="SeleccionarOcurrePedido"
      onSubmit={GuardaInformacionDeLaOcurrencia}
    >
      <span className="SeleccionarOcurrePedido__Opciones">
        <button
          type="button"
          className="SeleccionarOcurrePedido__Opciones--Boton Registrar"
          onClick={() => establecerVistaDestinatario(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
        <button
          type="button"
          className="SeleccionarOcurrePedido__Opciones--Boton Lista"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarOcurrePedido__Titulo">
        {DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO[Idioma].IngresaElNombre}
      </h1>
      <span className="SeleccionarOcurrePedido__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon>
          {DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO[Idioma].Nombre}
        </p>
        <input
          id="NombreDestinatario"
          type="text"
          name="NombreDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreDestinatario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("NombreDestinatario")}
      </span>
      <span className="SeleccionarOcurrePedido__Campo Dos">
        <p>
          <ion-icon name="person"></ion-icon>
          {DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO[Idioma].Apellidos}
        </p>
        <input
          id="ApellidosDestinatario"
          type="text"
          name="ApellidosDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("ApellidosDestinatario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("ApellidosDestinatario")}
      </span>
      <h1 className="SeleccionarOcurrePedido__Titulo">
        {DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO[Idioma].SeleccionarOcurre}
      </h1>
      <span className="SeleccionarOcurrePedido__Buscar">
        <input
          type="text"
          placeholder={
            DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO[Idioma].BuscarOcurre
          }
          onChange={ObtenerOcurres}
        />
        <span className="SeleccionarOcurrePedido__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ocurresActivos.length > 0 ? (
        <>
          <small className="SeleccionarOcurrePedido__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {ocurresActivos.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}
          </small>
          <div className="SeleccionarOcurrePedido__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                type="button"
                className="SeleccionarOcurrePedido__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back"></ion-icon>
              </button>
            )}
            {indiceFinal < ocurresActivos.length && (
              <button
                type="button"
                className="SeleccionarOcurrePedido__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward"></ion-icon>
              </button>
            )}
          </div>

          {ocurresActivos
            .slice(indiceInicial, indiceFinal)
            .map((ocurre, index) => (
              <section
                className={`SeleccionarOcurrePedido__Ocurre ${
                  idOcurreSeleccionado === ocurre.idOcurre && "Seleccionado"
                }`}
                key={index}
                onClick={() => EstablecerElOcurreSeleccionado(ocurre)}
              >
                <ion-icon name="alert-circle"></ion-icon>
                <p>{ocurre.NombreOcurre}</p>
                <ion-icon name="business"></ion-icon>
                <p>{ocurre.OperadorLogisticoOcurre}</p>
                <ion-icon name="location"></ion-icon>
                <p>
                  {ocurre.EstadoOcurre}, {ocurre.CiudadOcurre}
                  <br />
                  {ocurre.DireccionOcurre} {ocurre.CodigoPostalOcurre}
                </p>
              </section>
            ))}
          <small className="SeleccionarOcurrePedido__TextoPaginas">
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
          UrlBoton={"/Ocurres"}
          TextoBoton={
            DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO[Idioma].RegistrarOcurre
          }
        />
      )}
      <footer className="SeleccionarOcurrePedido__Footer">
        <button
          className="SeleccionarOcurrePedido__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          {DICCIONARIO_BOTONES[Idioma].Regresar}
        </button>
        <button
          type="submit"
          className="SeleccionarOcurrePedido__Footer__Boton Siguiente"
        >
          {DICCIONARIO_BOTONES[Idioma].Siguiente}
        </button>
      </footer>
      <AgenciaSeleccionadaPedido
        Idioma={Idioma}
        NombreAgencia={agencia?.NombreAgencia}
      />
    </form>
  );
}
