/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_DEL_PEDIDO,
  DICCIONARIO_RESULTADOS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorPaquete from "../../../hooks/Pedidos/useBuscarPedidosPorPaquete";
import useBuscarMovimientosDeUnPedido from "../../../hooks/Pedidos/useBuscarMovimientosDeUnPedido";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";
import { HOST_PDF } from "../../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/ListaPedidos/DetallesPedido.css";

export default function DetallesPedido({
  Idioma,
  esCompleta,
  detallesPedido,
  establecerVista,
  ReiniciarRealizarPedido,
}) {
  const { CodigoRastreo, GuiaPedido } = detallesPedido;
  const [indicePedido, establecerIndicePedido] = useState(0);
  const { paquete, cargandoPaquete } = useBuscarPedidosPorPaquete({
    CodigoRastreo,
    GuiaPedido,
  });

  const { movimientos, cargandoMovimientos } = useBuscarMovimientosDeUnPedido(
    paquete?.[indicePedido]?.GuiaPedido // Usa acceso condicional por si el paquete o el índice son indefinidos
  );

  const SiguientePedido = () => {
    if (indicePedido < paquete.length - 1) {
      establecerIndicePedido(indicePedido + 1);
    }
  };
  const AnteriorPedido = () => {
    if (indicePedido > 0) {
      establecerIndicePedido(indicePedido - 1);
    }
  };

  if (cargandoPaquete) return <Cargando />;

  // LA FUNCIÓN DE ReiniciarRealizarPedido ES PARA EL COMPONENTE DE "REALIZAR PEDIDO"
  return (
    <div className="DetallesPedido">
      {paquete.length > 0 ? (
        <>
          <section className="DetallesPedido__Opciones">
            {ReiniciarRealizarPedido ? (
              <button
                className="DetallesPedido__Opciones--Boton OtroPedido"
                onClick={() => ReiniciarRealizarPedido()}
              >
                <ion-icon name="repeat"></ion-icon>
              </button>
            ) : (
              <button
                className="DetallesPedido__Opciones--Boton Regresar"
                onClick={() => establecerVista(esCompleta ? 0 : 1)}
              >
                <ion-icon name="arrow-back"></ion-icon>
              </button>
            )}
            <span className="DetallesPedido__Opciones--Botones">
              <a
                className="DetallesPedido__Opciones--Boton Ticket"
                href={`${HOST_PDF}/${paquete[indicePedido].TicketPedido}`}
                target="_blank"
              >
                <ion-icon name="ticket"></ion-icon>
              </a>
              <a
                className="DetallesPedido__Opciones--Boton CodigoDeBarras"
                href={`${HOST_PDF}/${paquete[indicePedido].EtiquetaPedido}`}
                target="_blank"
              >
                <ion-icon name="barcode"></ion-icon>
              </a>
              {paquete.length > 1 && (
                <a
                  className="DetallesPedido__Opciones--Boton PaqueteTickets"
                  href={`${HOST_PDF}/${paquete[indicePedido].PaqueteTicketsPedido}`}
                  target="_blank"
                >
                  <ion-icon name="cube"></ion-icon>
                </a>
              )}
            </span>
          </section>
          {paquete.length > 1 && (
            <section className="DetallesPedido__OtrosPedidos">
              <small className="DetallesDelPedido__OtrosPedidos--Texto">
                {DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].MensajeParteUno}{" "}
                {paquete.length - 1}{" "}
                {DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].MensajeParteDos}{" "}
                <ion-icon name="documents"></ion-icon>
              </small>
              <div className="DetallesPedido__OtrosPedidos--Botones">
                {indicePedido > 0 && (
                  <button
                    className="DetallesPedido__OtrosPedidos--Botones--Boton Anterior"
                    onClick={AnteriorPedido}
                  >
                    <ion-icon name="chevron-back"></ion-icon>
                  </button>
                )}
                {indicePedido < paquete.length - 1 && (
                  <button
                    className="DetallesPedido__OtrosPedidos--Botones--Boton Siguiente"
                    onClick={SiguientePedido}
                  >
                    <ion-icon name="chevron-forward"></ion-icon>
                  </button>
                )}
              </div>
              <small className="DetallesPedido__OtrosPedidos--Texto">
                ({indicePedido + 1}/{paquete.length})
              </small>
            </section>
          )}
          <section className="DetallesPedido__Seccion">
            <img src="LogoEnvio.png" alt="Logo Envio" />
            <h1>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].DetallesDeEnvio}</h1>
          </section>
          <div className="DetallesPedido__Detalles Folio">
            <ion-icon name="folder"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Folio}</b> USMX
            {paquete[indicePedido].idPedido}
          </div>
          <div className="DetallesPedido__Detalles Guia">
            <ion-icon name="document-text"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Guia}</b>{" "}
            {paquete[indicePedido].GuiaPedido}
          </div>
          <div className="DetallesPedido__Detalles Usuario">
            <ion-icon name="person-circle"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Usuario}</b>{" "}
            {paquete[indicePedido].Usuario}
          </div>
          <div
            className={`DetallesPedido__Detalles ${paquete[indicePedido].EstadoPedido}`}
          >
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].EstadoDePago}</b>{" "}
            {paquete[indicePedido].EstadoPedido}
          </div>
          <div className="DetallesPedido__Detalles Agencia">
            <ion-icon name="business"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Agencia}</b>{" "}
            {paquete[indicePedido].NombreAgencia}
          </div>
          <div className="DetallesPedido__Detalles Fecha">
            <ion-icon name="calendar"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].FechaCreacion}</b>{" "}
            {FormatearFecha(
              paquete[indicePedido].FechaCreacionPedido.slice(0, 10)
            )}{" "}
            {paquete[indicePedido].HoraCreacionPedido}
          </div>
          <div className="DetallesPedido__Detalles Remitente">
            <p className="DetallesPedido__Detalles__Encabezado">
              <ion-icon name="paper-plane"></ion-icon>{" "}
              <b>
                {
                  DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma]
                    .InformacionDelRemitente
                }
              </b>
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Nombre} </b>
              {paquete[indicePedido].NombreRemitente}{" "}
              {paquete[indicePedido].ApellidosRemitente}
            </p>
            {(paquete[indicePedido].TelefonoUnoRemitente !== "" ||
              paquete[indicePedido].TelefonoDosRemitente !== "") && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Telefonos} </b>
                {paquete[indicePedido].TelefonoUnoRemitente &&
                  paquete[indicePedido].TelefonoUnoRemitente}
                {paquete[indicePedido].TelefonoDosRemitente &&
                  ` - ${paquete[indicePedido].TelefonoDosRemitente}`}
              </p>
            )}
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Correo} </b>
              {paquete[indicePedido].CorreoRemitente}
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Direccion} </b>
              <br />
              {paquete[indicePedido].PaisRemitente} <br />{" "}
              {paquete[indicePedido].EstadoRemitente} -{" "}
              {paquete[indicePedido].CiudadRemitente} -{" "}
              {paquete[indicePedido].DireccionRemitente}{" "}
              {paquete[indicePedido].CodigoPostalRemitente}
            </p>
            {paquete[indicePedido].ReferenciaRemitente && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Referencia}: </b>
                {paquete[indicePedido].ReferenciaRemitente}
              </p>
            )}
          </div>
          <div className="DetallesPedido__Detalles Destinatario">
            <p className="DetallesPedido__Detalles__Encabezado">
              <ion-icon name="location"></ion-icon>{" "}
              <b>
                {
                  DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma]
                    .InformacionDelDestinatario
                }
              </b>
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Nombre} </b>
              {paquete[indicePedido].NombreDestinatario}{" "}
              {paquete[indicePedido].ApellidosDestinatario}
            </p>
            {(paquete[indicePedido].TelefonoUnoDestinatario !== "" ||
              paquete[indicePedido].TelefonoDosDestinatario !== "") && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Telefonos} </b>
                {paquete[indicePedido].TelefonoUnoDestinatario &&
                  paquete[indicePedido].TelefonoUnoDestinatario}
                {paquete[indicePedido].TelefonoDosDestinatario &&
                  ` - ${paquete[indicePedido].TelefonoDosDestinatario}`}
              </p>
            )}
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Correo} </b>
              {paquete[indicePedido].CorreoDestinatario}
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Direccion}</b>
              <br />
              {paquete[indicePedido].PaisDestinatario} <br />{" "}
              {paquete[indicePedido].EstadoDestinatario} -{" "}
              {paquete[indicePedido].CiudadDestinatario} -{" "}
              {paquete[indicePedido].DireccionDestinatario}{" "}
              {paquete[indicePedido].CodigoPostalDestinatario}
            </p>
            {paquete[indicePedido].ReferenciaDestinatario && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Referencia} </b>
                {paquete[indicePedido].ReferenciaDestinatario}
              </p>
            )}
          </div>
          <section className="DetallesPedido__Seccion">
            <img src="LogoPaquete.png" alt="Logo Paquete" />
            <h1>
              {DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].DetallesDelPaquete}
            </h1>
          </section>
          <div className="DetallesPedido__Detalles Largo">
            <ion-icon name="swap-vertical"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Largo}</b>
            {paquete[indicePedido].LargoPedido}
          </div>
          <div className="DetallesPedido__Detalles Ancho">
            <ion-icon name="swap-horizontal"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Ancho}</b>
            {paquete[indicePedido].AnchoPedido}
          </div>
          <div className="DetallesPedido__Detalles Alto">
            <ion-icon name="arrow-up"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Alto}</b>
            {paquete[indicePedido].AltoPedido}
          </div>
          <div className="DetallesPedido__Detalles PieCubico">
            <ion-icon name="cube"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].PieCubico}</b>
            {paquete[indicePedido].PieCubicoPedido}
          </div>
          <div className="DetallesPedido__Detalles Volumen">
            <ion-icon name="cube"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Volumen}</b>
            {paquete[indicePedido].LargoPedido} x{" "}
            {paquete[indicePedido].AnchoPedido} x{" "}
            {paquete[indicePedido].AltoPedido}
          </div>
          <div className="DetallesPedido__Detalles Peso">
            <ion-icon name="scale"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Peso}</b>
            {paquete[indicePedido].PesoPedido}
          </div>
          <div className="DetallesPedido__Detalles Contenido">
            <ion-icon name="document-text"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Contenido}</b>
            {paquete[indicePedido].ContenidoPedido}
          </div>
          <section className="DetallesPedido__Seccion">
            <img src="LogoImportes.png" alt="Logo Importes" />
            <h1>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Importes}</h1>
          </section>
          <div className="DetallesPedido__Detalles ValorDeclarado">
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].ValorDeclarado}</b>
            {paquete[indicePedido].ValorDeclaradoPedido.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </div>
          <div className="DetallesPedido__Detalles ValorAsegurado">
            <ion-icon name="shield-checkmark"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].ValorAsegurado}</b>
            {paquete[indicePedido].ValorAseguradoPedido.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </div>
          <div className="DetallesPedido__Detalles TCF">
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].TCF}</b>
            {paquete[indicePedido].TCFPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="DetallesPedido__Detalles CostoEnvio">
            <ion-icon name="airplane"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].CostoDeEnvio}</b>
            {paquete[indicePedido].CostoEnvioPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="DetallesPedido__Detalles CostoSeguro">
            <ion-icon name="shield"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].CostoDeSeguro}</b>
            {paquete[indicePedido].CostoSeguroPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="DetallesPedido__Detalles CostoSobrePeso">
            <ion-icon name="scale"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].CostoSobrepeso}</b>
            {paquete[indicePedido].CostoSobrePesoPedido.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </div>
          <div className="DetallesPedido__Detalles Total">
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].TotalAPagar}</b>
            {paquete[indicePedido].TotalPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <section className="DetallesPedido__Seccion">
            <img src="LogoRastreo.png" alt="Logo Rastreo" />
            <h1>
              {DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].MovimientosDelPedido}
            </h1>
          </section>
          <div className="DetallesPedido__Detalles Movimiento">
            {cargandoMovimientos ? (
              <Cargando />
            ) : (
              <>
                <span className="DetallesPedido__Detalles__Movimiento--Encabezado">
                  <p className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="bag-check"></ion-icon>{" "}
                    {DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].EstadoDelPedido}
                  </p>
                  <p className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="car"></ion-icon>{" "}
                    <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Movimiento}</b>
                  </p>
                  <p className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="calendar"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].FechaCreacion}
                    </b>
                  </p>
                  <p className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="locate"></ion-icon>{" "}
                    <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[Idioma].Origen}</b>
                  </p>
                </span>
                {movimientos.length > 0 ? (
                  movimientos.map((movimiento, index) => (
                    <span
                      key={index}
                      className={`DetallesPedido__Detalles__Movimiento--Encabezado ${movimiento.EstadoMovimiento}`}
                    >
                      <b className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.EstadoMovimiento.toUpperCase()}
                      </b>
                      <b className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.DetallesMovimiento}
                      </b>
                      <b className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.FechaCreacionUnion.slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}{" "}
                        {movimiento.HoraCreacionUnion}
                      </b>
                      <b className="DetallesPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.OrigenMovimiento}
                      </b>
                    </span>
                  ))
                ) : (
                  <MensajeGeneral
                    Imagen={"SinResultados.png"}
                    Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultado}
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultado}
        />
      )}
    </div>
  );
}
