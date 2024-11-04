/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDestinatariosPorAgencia from "../../../hooks/useBuscarDestinatariosPorAgencia";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { ESTILOS_SUCCESS } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/SeleccionarDestinatarioPedido.css";
export default function SeleccionarDestinatarioPedido({
  establecerVistaDestinatario,
  establecerDestinatario,
  establecerPaso,
  agencia,
  paso,
}) {
  const { destinatarios, cargandoDestinatarios, establecerFiltro } =
    useBuscarDestinatariosPorAgencia({
      idAgencia: agencia.idAgencia,
    });

  useEffect(() => {
    if (destinatarios) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        destinatarios.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [destinatarios]);

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

  const ObtenerDestinatarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstablecerElDestinatarioSeleccionado = (destinatario) => {
    establecerDestinatario(destinatario);
    establecerPaso(paso + 1);
    toast.success(
      `¡El destinatario ${destinatario.NombreDestinatario.toUpperCase()} ${destinatario.ApellidoPaternoDestinatario.toUpperCase()} ${destinatario.ApellidoMaternoDestinatario.toUpperCase()} ha sido seleccionado con éxito!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
  };

  if (cargandoDestinatarios) return <Cargando />;

  return (
    <section className="SeleccionarDestinatarioPedido">
      <span className="SeleccionarDestinatarioPedido__Opciones">
        <button
          type="button"
          className="SeleccionarDestinatarioPedido__Opciones--Boton Registrar"
          onClick={() => establecerVistaDestinatario(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
        <button
          type="button"
          className="SeleccionarDestinatarioPedido__Opciones--Boton Ocurre"
          onClick={() => establecerVistaDestinatario(2)}
        >
          <ion-icon name="alert-circle"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarDestinatarioPedido__Titulo">
        Seleccionar Destinatario
      </h1>
      <span className="SeleccionarDestinatarioPedido__Buscar">
        <input
          type="text"
          placeholder="Buscar Destinatario"
          onChange={ObtenerDestinatarios}
        />
        <span className="SeleccionarDestinatarioPedido__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {destinatarios.length > 0 ? (
        <>
          <small className="SeleccionarDestinatarioPedido__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {destinatarios.length} resultados
          </small>
          <div className="SeleccionarDestinatarioPedido__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="SeleccionarDestinatarioPedido__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back"></ion-icon>
              </button>
            )}
            {indiceFinal < destinatarios.length && (
              <button
                className="SeleccionarDestinatarioPedido__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward"></ion-icon>
              </button>
            )}
          </div>
          {destinatarios
            .slice(indiceInicial, indiceFinal)
            .map((destinatario, index) => (
              <section
                className="SeleccionarDestinatarioPedido__Remitente"
                key={index}
                onClick={() =>
                  EstablecerElDestinatarioSeleccionado(destinatario)
                }
              >
                <ion-icon name="person-circle"></ion-icon>
                <p>
                  {destinatario.NombreDestinatario}{" "}
                  {destinatario.ApellidosDestinatario}
                </p>
                <ion-icon name="location"></ion-icon>
                <p>
                  {destinatario.PaisDestinatario}
                  <br />
                  {destinatario.EstadoDestinatario},{" "}
                  {destinatario.CiudadDestinatario}
                  <br />
                  {destinatario.DireccionDestinatario}
                  {destinatario.CodigoPostalDestinatario}
                </p>
              </section>
            ))}
          <small className="SeleccionarDestinatarioPedido__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
          <AgenciaSeleccionadaPedido NombreAgencia={agencia?.NombreAgencia} />
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
        />
      )}
    </section>
  );
}
