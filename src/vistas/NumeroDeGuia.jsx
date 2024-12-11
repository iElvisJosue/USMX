// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useParams } from "react-router-dom";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../componentes/Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidoPorNumeroDeGuia from "../hooks/useBuscarPedidoPorNumeroDeGuia";

// IMPORTAMOS LAS AYUDAS
import { HOST, HOST_IMAGENES } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/NumeroDeGuia.css";

export default function NumeroDeGuia() {
  const { cargandoInfSistema, infSistema } = useSistema();
  const { GuiaPedido } = useParams();

  const { informacionGuia, buscandoInformacionGuia } =
    useBuscarPedidoPorNumeroDeGuia(GuiaPedido);

  if (buscandoInformacionGuia || cargandoInfSistema) return <Cargando />;

  const BuscarNuevaGuia = () => {
    const InputGuia = document.querySelector(
      ".NumeroDeGuia__BuscarNuevamente--Input"
    );
    const NuevaGuia = InputGuia.value;
    if (!NuevaGuia) return InputGuia.focus();
    window.location.href = `${HOST}NumeroDeGuia/${NuevaGuia}`;
  };

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="NumeroDeGuia">
      {informacionGuia.length === 0 && (
        <span className="NumeroDeGuia__BuscarNuevamente">
          <input
            type="text"
            placeholder="Buscar otra guía"
            className="NumeroDeGuia__BuscarNuevamente--Input"
            onKeyDown={(e) => {
              if (e.key === "Enter") BuscarNuevaGuia();
            }}
          />
          <button
            type="button"
            className="NumeroDeGuia__BuscarNuevamente--Boton"
            onClick={BuscarNuevaGuia}
          >
            <ion-icon name="search"></ion-icon>
          </button>
        </span>
      )}
      <article className="NumeroDeGuia__Ticket">
        {informacionGuia.length > 0 ? (
          <>
            <img
              className="NumeroDeGuia__Ticket--Logo"
              src={`${HOST_IMAGENES}/${infSistema.LogoSistema}`}
              alt={infSistema.NombreSistema}
            />
            <p className="NumeroDeGuia__Ticket--Detalles">
              Número de guía <br /> <b>{GuiaPedido}</b>
            </p>
            <hr className="NumeroDeGuia__Separador" />
            <p className="NumeroDeGuia__Ticket--Detalles">
              <ion-icon name="paper-plane"></ion-icon> <br />
              Remitente <br />{" "}
              <b>
                {informacionGuia[0].NombreRemitente}{" "}
                {informacionGuia[0].ApellidosRemitente}
              </b>
            </p>
            <hr className="NumeroDeGuia__Separador" />
            <p className="NumeroDeGuia__Ticket--Detalles">
              <ion-icon name="location"></ion-icon>
              <br />
              Destinatario <br />{" "}
              <b>
                {informacionGuia[0].NombreDestinatario}{" "}
                {informacionGuia[0].ApellidosDestinatario}
              </b>
              <br />
              <b>
                {informacionGuia[0].TelefonoUnoDestinatario ||
                informacionGuia[0].TelefonoDosDestinatario
                  ? `${
                      informacionGuia[0].TelefonoUnoDestinatario
                        ? informacionGuia[0].TelefonoUnoDestinatario
                        : ""
                    }${
                      informacionGuia[0].TelefonoDosDestinatario
                        ? ` - ${informacionGuia[0].TelefonoDosDestinatario}`
                        : ""
                    }`
                  : "Teléfono(s): N/A"}
              </b>
              <br />
              <b>
                {informacionGuia[0].PaisDestinatario}
                <br />
                {informacionGuia[0].EstadoDestinatario} /{" "}
                {informacionGuia[0].CiudadDestinatario}
              </b>
              <br />
              <b>
                {informacionGuia[0].DireccionDestinatario}{" "}
                {informacionGuia[0].CodigoPostalDestinatario}
              </b>
              <br />
              {informacionGuia[0].ReferenciaDestinatario && (
                <b>Ref. {informacionGuia[0].ReferenciaDestinatario}</b>
              )}
            </p>
            <hr className="NumeroDeGuia__Separador" />
            <p className="NumeroDeGuia__Ticket--Detalles">
              <ion-icon name="cube"></ion-icon> <br />
              Producto <br />
              <b>{informacionGuia[0].ProductoPedido}</b> <br />
              <b>
                Ancho: {informacionGuia[0].AnchoPedido} - Largo:{" "}
                {informacionGuia[0].LargoPedido} - Alto:{" "}
                {informacionGuia[0].AltoPedido}
              </b>
              <br />
              <b>Peso: {informacionGuia[0].PesoPedido} lb(s)</b>
            </p>
          </>
        ) : (
          <>
            <img
              className="NumeroDeGuia__Ticket--Logo"
              src="/SinResultados.png"
              alt="Logo Sin Resultados"
            />
            <p className="NumeroDeGuia__Ticket--Detalles SinResultados">
              ¡Oops! Parece que el número de guía <b>{GuiaPedido}</b> no existe.
            </p>
          </>
        )}
      </article>
      {informacionGuia.length > 0 && (
        <article className="NumeroDeGuia__Movimientos">
          <img
            className="NumeroDeGuia__Movimientos--Logo"
            src="/RastreoTicket.png"
            alt="Logo rastreando pedido"
          />
          <p className="NumeroDeGuia__Movimientos--Titulo">
            Movimientos del pedido
          </p>
          <hr className="NumeroDeGuia__Separador" />
          {informacionGuia.map((movimiento, index) => (
            <p
              className={`NumeroDeGuia__Movimientos--Detalles ${movimiento.EstadoMovimiento}`}
              key={index}
            >
              {movimiento.EstadoMovimiento} - {movimiento.DetallesMovimiento} -{" "}
              {movimiento.FechaCreacionUnion.slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}{" "}
              {movimiento.HoraCreacionUnion}
            </p>
          ))}
        </article>
      )}
    </main>
  );
}
