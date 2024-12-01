/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_DETALLES_DEL_PEDIDO,
  DICCIONARIO_RESULTADOS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorPaquete from "../../../hooks/useBuscarPedidosPorPaquete";
import useBuscarMovimientosDeUnPedido from "../../../hooks/useBuscarMovimientosDeUnPedido";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";
import { HOST_PDF } from "../../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/DetallesDelPedido.css";

export default function DetallesDelPedido({
  idioma,
  detallesPedido,
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
    <div className="DetallesDelPedido">
      {paquete.length > 0 ? (
        <>
          <section className="DetallesDelPedido__Opciones">
            <button
              className="DetallesDelPedido__Opciones--Boton OtroPedido"
              onClick={() => ReiniciarRealizarPedido()}
            >
              <ion-icon name="repeat"></ion-icon>
            </button>
            <span className="DetallesDelPedido__Opciones--Botones">
              <a
                className="DetallesDelPedido__Opciones--Boton Ticket"
                href={`${HOST_PDF}/${paquete[indicePedido].TicketPedido}`}
                target="_blank"
              >
                <ion-icon name="ticket"></ion-icon>
              </a>
              <a
                className="DetallesDelPedido__Opciones--Boton CodigoDeBarras"
                href={`${HOST_PDF}/${paquete[indicePedido].EtiquetaPedido}`}
                target="_blank"
              >
                <ion-icon name="barcode"></ion-icon>
              </a>
              {paquete.length > 1 && (
                <a
                  className="DetallesDelPedido__Opciones--Boton PaqueteTickets"
                  href={`${HOST_PDF}/${paquete[indicePedido].PaqueteTicketsPedido}`}
                  target="_blank"
                >
                  <ion-icon name="cube"></ion-icon>
                </a>
              )}
            </span>
          </section>
          {paquete.length > 1 && (
            <section className="DetallesDelPedido__OtrosPedidos">
              <small className="DetallesDelPedido__OtrosPedidos--Texto">
                {DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].MensajeParteUno}{" "}
                {paquete.length - 1}{" "}
                {DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].MensajeParteDos}{" "}
                <ion-icon name="documents"></ion-icon>
              </small>
              <div className="DetallesDelPedido__OtrosPedidos--Botones">
                {indicePedido > 0 && (
                  <button
                    className="DetallesDelPedido__OtrosPedidos--Botones--Boton Anterior"
                    onClick={AnteriorPedido}
                  >
                    <ion-icon name="chevron-back"></ion-icon>
                  </button>
                )}
                {indicePedido < paquete.length - 1 && (
                  <button
                    className="DetallesDelPedido__OtrosPedidos--Botones--Boton Siguiente"
                    onClick={SiguientePedido}
                  >
                    <ion-icon name="chevron-forward"></ion-icon>
                  </button>
                )}
              </div>
              <small className="DetallesDelPedido__OtrosPedidos--Texto">
                ({indicePedido + 1}/{paquete.length})
              </small>
            </section>
          )}
          <section className="DetallesDelPedido__Seccion">
            <img src="LogoEnvio.png" alt="Logo Envio" />
            <h1>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].DetallesDeEnvio}</h1>
          </section>
          <div className="DetallesDelPedido__Detalles Folio">
            <ion-icon name="folder"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Folio}</b> USMX
            {paquete[indicePedido].idPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Guia">
            <ion-icon name="document-text"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Guia}</b>{" "}
            {paquete[indicePedido].GuiaPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Usuario">
            <ion-icon name="person-circle"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Usuario}</b>{" "}
            {paquete[indicePedido].Usuario}
          </div>
          <div
            className={`DetallesDelPedido__Detalles ${paquete[indicePedido].EstadoPedido}`}
          >
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].EstadoDePago}</b>{" "}
            {paquete[indicePedido].EstadoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Agencia">
            <ion-icon name="business"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Agencia}</b>{" "}
            {paquete[indicePedido].NombreAgencia}
          </div>
          <div className="DetallesDelPedido__Detalles Fecha">
            <ion-icon name="calendar"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].FechaCreacion}</b>{" "}
            {FormatearFecha(
              paquete[indicePedido].FechaCreacionPedido.slice(0, 10)
            )}{" "}
            {paquete[indicePedido].HoraCreacionPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Remitente">
            <p className="DetallesDelPedido__Detalles__Encabezado">
              <ion-icon name="paper-plane"></ion-icon>{" "}
              <b>
                {
                  DICCIONARIO_DETALLES_DEL_PEDIDO[idioma]
                    .InformacionDelRemitente
                }
              </b>
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Nombre} </b>
              {paquete[indicePedido].NombreRemitente}{" "}
              {paquete[indicePedido].ApellidosRemitente}
            </p>
            {(paquete[indicePedido].TelefonoUnoRemitente !== "" ||
              paquete[indicePedido].TelefonoDosRemitente !== "") && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Telefonos} </b>
                {paquete[indicePedido].TelefonoUnoRemitente &&
                  paquete[indicePedido].TelefonoUnoRemitente}
                {paquete[indicePedido].TelefonoDosRemitente &&
                  ` - ${paquete[indicePedido].TelefonoDosRemitente}`}
              </p>
            )}
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Correo} </b>
              {paquete[indicePedido].CorreoRemitente}
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Direccion} </b>
              <br />
              {paquete[indicePedido].PaisRemitente} <br />{" "}
              {paquete[indicePedido].EstadoRemitente} -{" "}
              {paquete[indicePedido].CiudadRemitente} -{" "}
              {paquete[indicePedido].DireccionRemitente}{" "}
              {paquete[indicePedido].CodigoPostalRemitente}
            </p>
            {paquete[indicePedido].ReferenciaRemitente && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Referencia}: </b>
                {paquete[indicePedido].ReferenciaRemitente}
              </p>
            )}
          </div>
          <div className="DetallesDelPedido__Detalles Destinatario">
            <p className="DetallesDelPedido__Detalles__Encabezado">
              <ion-icon name="location"></ion-icon>{" "}
              <b>
                {
                  DICCIONARIO_DETALLES_DEL_PEDIDO[idioma]
                    .InformacionDelDestinatario
                }
              </b>
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Nombre} </b>
              {paquete[indicePedido].NombreDestinatario}{" "}
              {paquete[indicePedido].ApellidosDestinatario}
            </p>
            {(paquete[indicePedido].TelefonoUnoDestinatario !== "" ||
              paquete[indicePedido].TelefonoDosDestinatario !== "") && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Telefonos} </b>
                {paquete[indicePedido].TelefonoUnoDestinatario &&
                  paquete[indicePedido].TelefonoUnoDestinatario}
                {paquete[indicePedido].TelefonoDosDestinatario &&
                  ` - ${paquete[indicePedido].TelefonoDosDestinatario}`}
              </p>
            )}
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Correo} </b>
              {paquete[indicePedido].CorreoDestinatario}
            </p>
            <p>
              <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Direccion}</b>
              <br />
              {paquete[indicePedido].PaisDestinatario} <br />{" "}
              {paquete[indicePedido].EstadoDestinatario} -{" "}
              {paquete[indicePedido].CiudadDestinatario} -{" "}
              {paquete[indicePedido].DireccionDestinatario}{" "}
              {paquete[indicePedido].CodigoPostalDestinatario}
            </p>
            {paquete[indicePedido].ReferenciaDestinatario && (
              <p>
                <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Referencia} </b>
                {paquete[indicePedido].ReferenciaDestinatario}
              </p>
            )}
          </div>
          <section className="DetallesDelPedido__Seccion">
            <img src="LogoPaquete.png" alt="Logo Paquete" />
            <h1>
              {DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].DetallesDelPaquete}
            </h1>
          </section>
          <div className="DetallesDelPedido__Detalles Largo">
            <ion-icon name="swap-vertical"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Largo}</b>
            {paquete[indicePedido].LargoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Ancho">
            <ion-icon name="swap-horizontal"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Ancho}</b>
            {paquete[indicePedido].AnchoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Alto">
            <ion-icon name="arrow-up"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Alto}</b>
            {paquete[indicePedido].AltoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles PieCubico">
            <ion-icon name="cube"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].PieCubico}</b>
            {paquete[indicePedido].PieCubicoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Volumen">
            <ion-icon name="cube"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Volumen}</b>
            {paquete[indicePedido].LargoPedido} x{" "}
            {paquete[indicePedido].AnchoPedido} x{" "}
            {paquete[indicePedido].AltoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Peso">
            <ion-icon name="scale"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Peso}</b>
            {paquete[indicePedido].PesoPedido}
          </div>
          <div className="DetallesDelPedido__Detalles Contenido">
            <ion-icon name="document-text"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Contenido}</b>
            {paquete[indicePedido].ContenidoPedido}
          </div>
          <section className="DetallesDelPedido__Seccion">
            <img src="LogoImportes.png" alt="Logo Importes" />
            <h1>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Importes}</h1>
          </section>
          <div className="DetallesDelPedido__Detalles ValorDeclarado">
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].ValorDeclarado}</b>
            {paquete[indicePedido].ValorDeclaradoPedido.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </div>
          <div className="DetallesDelPedido__Detalles ValorAsegurado">
            <ion-icon name="shield-checkmark"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].ValorAsegurado}</b>
            {paquete[indicePedido].ValorAseguradoPedido.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </div>
          <div className="DetallesDelPedido__Detalles TCF">
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].TCF}</b>
            {paquete[indicePedido].TCFPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="DetallesDelPedido__Detalles CostoEnvio">
            <ion-icon name="airplane"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].CostoDeEnvio}</b>
            {paquete[indicePedido].CostoEnvioPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="DetallesDelPedido__Detalles CostoSeguro">
            <ion-icon name="shield"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].CostoDeSeguro}</b>
            {paquete[indicePedido].CostoSeguroPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="DetallesDelPedido__Detalles CostoSobrePeso">
            <ion-icon name="scale"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].CostoSobrepeso}</b>
            {paquete[indicePedido].CostoSobrePesoPedido.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </div>
          <div className="DetallesDelPedido__Detalles Total">
            <ion-icon name="cash"></ion-icon>{" "}
            <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].TotalAPagar}</b>
            {paquete[indicePedido].TotalPedido.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <section className="DetallesDelPedido__Seccion">
            <img src="LogoRastreo.png" alt="Logo Rastreo" />
            <h1>
              {DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].MovimientosDelPedido}
            </h1>
          </section>
          <div className="DetallesDelPedido__Detalles Movimiento">
            {cargandoMovimientos ? (
              <Cargando />
            ) : (
              <>
                <span className="DetallesDelPedido__Detalles__Movimiento--Encabezado">
                  <p className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="bag-check"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].EstadoDelPedido}
                    </b>
                  </p>
                  <p className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="car"></ion-icon>{" "}
                    <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Movimiento}</b>
                  </p>
                  <p className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="calendar"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].FechaCreacion}
                    </b>
                  </p>
                  <p className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="locate"></ion-icon>{" "}
                    <b>{DICCIONARIO_DETALLES_DEL_PEDIDO[idioma].Origen}</b>
                  </p>
                </span>
                {movimientos.length > 0 ? (
                  movimientos.map((movimiento, index) => (
                    <span
                      key={index}
                      className={`DetallesDelPedido__Detalles__Movimiento--Encabezado ${movimiento.EstadoMovimiento}`}
                    >
                      <b className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.EstadoMovimiento.toUpperCase()}
                      </b>
                      <b className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.DetallesMovimiento}
                      </b>
                      <b className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.FechaCreacionUnion.slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}{" "}
                        {movimiento.HoraCreacionUnion}
                      </b>
                      <b className="DetallesDelPedido__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.OrigenMovimiento}
                      </b>
                    </span>
                  ))
                ) : (
                  <MensajeGeneral
                    Imagen={"SinResultados.png"}
                    Texto={DICCIONARIO_RESULTADOS[idioma].NoResultado}
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[idioma].NoResultado}
        />
      )}
    </div>
  );
}
