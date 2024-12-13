/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarRemitentesPorAgencia from "../../../hooks/useBuscarRemitentesPorAgencia";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_SELECCIONAR_REMITENTE_PEDIDO,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";

// IMPORTAMOS LAS AYUDAS
import { ESTILOS_SUCCESS } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/SeleccionarRemitentePedido.css";
export default function SeleccionarRemitente({
  Idioma,
  establecerVistaRemitente,
  establecerRemitente,
  establecerPaso,
  agencia,
  paso,
}) {
  const { remitentes, cargandoRemitentes, establecerFiltro } =
    useBuscarRemitentesPorAgencia({
      idAgencia: agencia.idAgencia,
    });

  useEffect(() => {
    if (remitentes) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        remitentes.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [remitentes]);

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

  const ObtenerRemitentes = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstableElRemitenteSeleccionado = (remitente) => {
    establecerRemitente(remitente);
    establecerPaso(paso + 1);
    toast.success(
      `¡El remitente ${remitente.NombreRemitente.toUpperCase()} ${remitente.ApellidosRemitente.toUpperCase()} ha sido seleccionado con éxito!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
  };

  if (cargandoRemitentes) return <Cargando />;

  return (
    <section className="SeleccionarRemitentePedido">
      <span className="SeleccionarRemitentePedido__Opciones">
        <button
          type="button"
          className="SeleccionarRemitentePedido__Opciones--Boton"
          onClick={() => establecerVistaRemitente(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarRemitentePedido__Titulo">
        {DICCIONARIO_SELECCIONAR_REMITENTE_PEDIDO[Idioma].SeleccionarRemitente}
      </h1>
      <span className="SeleccionarRemitentePedido__Buscar">
        <input
          type="text"
          placeholder={
            DICCIONARIO_SELECCIONAR_REMITENTE_PEDIDO[Idioma].BuscarRemitente
          }
          onChange={ObtenerRemitentes}
        />
        <span className="SeleccionarRemitentePedido__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {remitentes.length > 0 ? (
        <>
          <small className="SeleccionarRemitentePedido__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {remitentes.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}
          </small>
          <div className="SeleccionarRemitentePedido__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="SeleccionarRemitentePedido__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < remitentes.length && (
              <button
                className="SeleccionarRemitentePedido__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {remitentes
            .slice(indiceInicial, indiceFinal)
            .map((remitente, index) => (
              <section
                className="SeleccionarRemitentePedido__Remitente"
                key={index}
                onClick={() => EstableElRemitenteSeleccionado(remitente)}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
                <p>
                  {remitente.NombreRemitente} {remitente.ApellidosRemitente}
                </p>
                <ion-icon name="location"></ion-icon>
                <p>
                  {remitente.PaisRemitente}
                  <br />
                  {remitente.EstadoRemitente}, {remitente.CiudadRemitente}
                  <br />
                  {remitente.DireccionRemitente}
                  {remitente.CodigoPostalRemitente}
                </p>
              </section>
            ))}
          <small className="SeleccionarRemitentePedido__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
          </small>
          <AgenciaSeleccionadaPedido
            Idioma={Idioma}
            NombreAgencia={agencia?.NombreAgencia}
          />
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </section>
  );
}
