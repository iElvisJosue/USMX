// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarUltimosDiezPedidos from "../hooks/useBuscarUltimosDiezPedidos";

// IMPORTAMOS LAS AYUDAS
import { HOST } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Bienvenida.css";

export default function Bienvenida() {
  const {
    cargandoUltimosDiezPedidos,
    ultimosDiezPedidos,
    buscarNuevamente,
    setBuscarNuevamente,
  } = useBuscarUltimosDiezPedidos();

  if (cargandoUltimosDiezPedidos) return <Cargando />;

  setTimeout(() => {
    setBuscarNuevamente(!buscarNuevamente);
  }, 5000);

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado icono="sparkles" seccion="Bienvenido" />
      <div className="Bienvenida">
        <section className="Bienvenida__Mensaje">
          <img src="Logo-USMX.png" alt="Logo USMX" />
          <p>¡Bienvenido al sistema de USMX XPRESS!</p>
          <p>Gestiona tus envíos de paquetería de manera rápida y sencilla.</p>
          <p>¡Comienza ahora a rastrear y administrar tus paquetes!</p>
        </section>
        <section className="Bienvenida__UltimasGuias">
          <h1 className="Bienvenida__UltimasGuias--Titulo">
            Últimos 10 pedidos realizados
          </h1>
          <div className="Bienvenida__UltimasGuias--Cuerpo">
            <header className="Bienvenida__UltimasGuias--Cuerpo--Encabezado">
              <span className="Bienvenida__UltimasGuias--Cuerpo--Encabezado--Titulos">
                <ion-icon name="document-text"></ion-icon> Guía
              </span>
              <span className="Bienvenida__UltimasGuias--Cuerpo--Encabezado--Titulos">
                <ion-icon name="business"></ion-icon> Agencia
              </span>
              <span className="Bienvenida__UltimasGuias--Cuerpo--Encabezado--Titulos">
                <ion-icon name="calendar"></ion-icon> Fecha
              </span>
            </header>
            {ultimosDiezPedidos.length > 0 ? (
              ultimosDiezPedidos.map(
                (
                  {
                    // CodigoRastreo
                    GuiaPedido,
                    NombreAgencia,
                    FechaCreacionPedido,
                    HoraCreacionPedido,
                  },
                  index
                ) => (
                  <div
                    className="Bienvenida__UltimasGuias--Cuerpo--Detalles"
                    key={index}
                  >
                    <small className="Bienvenida__UltimasGuias--Cuerpo--Detalles--Texto">
                      {GuiaPedido}
                    </small>
                    <small className="Bienvenida__UltimasGuias--Cuerpo--Detalles--Texto">
                      {NombreAgencia}
                    </small>
                    <small className="Bienvenida__UltimasGuias--Cuerpo--Detalles--Texto">
                      {FechaCreacionPedido.slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}{" "}
                      {HoraCreacionPedido}
                    </small>
                  </div>
                )
              )
            ) : (
              <div className="Bienvenida__UltimasGuias--Cuerpo--SinResultados">
                <img src="SinResultados.png" alt="No hay resultados" />
                <small>
                  ¡Oops! Parece que aún no tienes pedidos realizados.
                </small>
                <a href={`${HOST}Realizar-Pedido`}>Realizar pedido</a>
              </div>
            )}
          </div>
        </section>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
