/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorPaquete from "../../hooks/useBuscarPedidosPorPaquete";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Pedidos/DetallesDelPedido.css";

export default function DetallesDelPedido({ detallesPedido, establecerVista }) {
  const { CodigoRastreo, GuiaPedido } = detallesPedido;
  const [indicePedido, establecerIndicePedido] = useState(0);
  const { paquete, cargandoPaquete } = useBuscarPedidosPorPaquete({
    CodigoRastreo,
    GuiaPedido,
  });

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

  return (
    <div className="DetallesDelPedido">
      <section className="DetallesDelPedido__Opciones">
        <button
          className="DetallesDelPedido__Opciones--Boton Regresar"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>Regresar
        </button>
        <button className="DetallesDelPedido__Opciones--Boton Imprimir">
          <ion-icon name="print"></ion-icon>Imprimir
        </button>
      </section>
      {paquete.length > 1 && (
        <section className="DetallesDelPedido__OtrosPedidos">
          <small className="DetallesDelPedido__OtrosPedidos--Texto">
            ¡Se han creado otros {paquete.length - 1} pedidos junto a este!{" "}
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
        <img src="LogoEnvio.png" alt="" />
        <h1>Detalles de envío</h1>
      </section>
      <div className="DetallesDelPedido__Detalles Folio">
        <ion-icon name="folder"></ion-icon> <b>Folio</b> USMX
        {paquete[indicePedido].idPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Guia">
        <ion-icon name="document-text"></ion-icon> <b>Guia</b>{" "}
        {paquete[indicePedido].GuiaPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Usuario">
        <ion-icon name="person-circle"></ion-icon> <b>Usuario responsable</b>{" "}
        {paquete[indicePedido].UsuarioResponsablePedido}
      </div>
      <div
        className={`DetallesDelPedido__Detalles ${paquete[indicePedido].EstadoPedido}`}
      >
        <ion-icon name="cash"></ion-icon> <b>Estado de pago</b>{" "}
        {paquete[indicePedido].EstadoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Agencia">
        <ion-icon name="business"></ion-icon> <b>Agencia</b>{" "}
        {paquete[indicePedido].NombreAgencia}
      </div>
      <div className="DetallesDelPedido__Detalles Fecha">
        <ion-icon name="calendar"></ion-icon> <b>Fecha y hora</b>{" "}
        {FormatearFecha(paquete[indicePedido].FechaCreacionPedido.slice(0, 10))}{" "}
        {paquete[indicePedido].HoraCreacionPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Remitente">
        <p className="DetallesDelPedido__Detalles__Encabezado">
          <ion-icon name="paper-plane"></ion-icon>{" "}
          <b>INFORMACIÓN DEL REMITENTE</b>
        </p>
        <p>
          <b>Nombre: </b>
          {paquete[indicePedido].NombreRemitente}{" "}
          {paquete[indicePedido].ApellidosRemitente}
        </p>
        <p>
          <b>Teléfono(s): </b>
          {paquete[indicePedido].TelefonoCasaRemitente}
          {paquete[indicePedido].CelularRemitente &&
            ` - ${paquete[indicePedido].CelularRemitente}`}
        </p>
        <p>
          <b>Correo: </b>
          {paquete[indicePedido].CorreoRemitente}
        </p>
        <p>
          <b>Dirección: </b>
          {paquete[indicePedido].DireccionRemitente} <br />{" "}
          {paquete[indicePedido].CiudadRemitente} -{" "}
          {paquete[indicePedido].EstadoRemitente} -{" "}
          {paquete[indicePedido].CodigoPostalRemitente}
        </p>
        {paquete[indicePedido].ReferenciaRemitente && (
          <p>
            <b>Referencia: </b>
            {paquete[indicePedido].ReferenciaRemitente}
          </p>
        )}
      </div>
      <div className="DetallesDelPedido__Detalles Destinatario">
        <p className="DetallesDelPedido__Detalles__Encabezado">
          <ion-icon name="location"></ion-icon>{" "}
          <b>INFORMACIÓN DEL DESTINATARIO</b>
        </p>
        <p>
          <b>Nombre: </b>
          {paquete[indicePedido].NombreDestinatario}{" "}
          {paquete[indicePedido].ApellidoPaternoDestinatario}{" "}
          {paquete[indicePedido].ApellidoMaternoDestinatario}
        </p>
        <p>
          <b>Teléfono(s): </b>
          {paquete[indicePedido].TelefonoCasaDestinatario}
          {paquete[indicePedido].CelularDestinatario &&
            ` - ${paquete[indicePedido].CelularDestinatario}`}
        </p>
        <p>
          <b>Correo: </b>
          {paquete[indicePedido].CorreoDestinatario}
        </p>
        <p>
          <b>Colonia: </b>
          {paquete[indicePedido].ColoniaDestinatario}
        </p>
        {paquete[indicePedido].MunicipioDelegacionDestinatario && (
          <p>
            <b>Municipio/Delegación: </b>
            {paquete[indicePedido].MunicipioDelegacionDestinatario}
          </p>
        )}

        <p>
          <b>Dirección: </b>
          {paquete[indicePedido].DireccionDestinatario} <br />{" "}
          {paquete[indicePedido].CiudadDestinatario} -{" "}
          {paquete[indicePedido].EstadoDestinatario} -{" "}
          {paquete[indicePedido].CodigoPostalDestinatario}
        </p>
        {paquete[indicePedido].ReferenciaDestinatario && (
          <p>
            <b>Referencia: </b>
            {paquete[indicePedido].ReferenciaDestinatario}
          </p>
        )}
      </div>
      <section className="DetallesDelPedido__Seccion">
        <img src="LogoPaquete.png" alt="" />
        <h1>Detalles del paquete</h1>
      </section>
      <div className="DetallesDelPedido__Detalles Largo">
        <ion-icon name="swap-vertical"></ion-icon> <b>Largo</b>
        {paquete[indicePedido].LargoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Ancho">
        <ion-icon name="swap-horizontal"></ion-icon> <b>Ancho</b>
        {paquete[indicePedido].AnchoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Alto">
        <ion-icon name="arrow-up"></ion-icon> <b>Alto</b>
        {paquete[indicePedido].AltoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles PieCubico">
        <ion-icon name="cube"></ion-icon> <b>Pie cubico</b>
        {paquete[indicePedido].PieCubicoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Volumen">
        <ion-icon name="cube"></ion-icon> <b>Volumen</b>
        {paquete[indicePedido].LargoPedido} x{" "}
        {paquete[indicePedido].AnchoPedido} x {paquete[indicePedido].AltoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Peso">
        <ion-icon name="cube"></ion-icon> <b>Peso</b>
        {paquete[indicePedido].PesoPedido}
      </div>
      <div className="DetallesDelPedido__Detalles Contenido">
        <ion-icon name="document-text"></ion-icon> <b>Contenido</b>
        {paquete[indicePedido].ContenidoPedido}
      </div>
      <section className="DetallesDelPedido__Seccion">
        <img src="LogoImportes.png" alt="" />
        <h1>Importes</h1>
      </section>
      <div className="DetallesDelPedido__Detalles ValorDeclarado">
        <ion-icon name="cash"></ion-icon> <b>Valor declarado</b>
        {paquete[indicePedido].ValorDeclaradoPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <div className="DetallesDelPedido__Detalles ValorAsegurado">
        <ion-icon name="shield-checkmark"></ion-icon> <b>Valor asegurado</b>
        {paquete[indicePedido].ValorAseguradoPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <div className="DetallesDelPedido__Detalles TCF">
        <ion-icon name="cash"></ion-icon> <b>TCF</b>
        {paquete[indicePedido].TCFPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <div className="DetallesDelPedido__Detalles CostoEnvio">
        <ion-icon name="airplane"></ion-icon> <b>Costo de envío</b>
        {paquete[indicePedido].CostoEnvioPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <div className="DetallesDelPedido__Detalles CostoSeguro">
        <ion-icon name="shield"></ion-icon> <b>Costo de seguro</b>
        {paquete[indicePedido].CostoSeguroPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <div className="DetallesDelPedido__Detalles CostoSobrePeso">
        <ion-icon name="scale"></ion-icon> <b>Costo sobrepeso</b>
        {paquete[indicePedido].CostoSobrePesoPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <div className="DetallesDelPedido__Detalles Total">
        <ion-icon name="cash"></ion-icon> <b>Total a pagar</b>
        {paquete[indicePedido].TotalPedido.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
    </div>
  );
}
