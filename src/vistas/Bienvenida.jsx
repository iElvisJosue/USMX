// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarUltimosDiezPedidos from "../hooks/useBuscarUltimosDiezPedidos";
import useObtenerResumenDiario from "../hooks/Bienvenida/useObtenerResumenDiario";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_BIENVENIDA,
  DICCIONARIO_RESULTADOS,
} from "../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { HOST, HOST_IMAGENES } from "../helpers/Urls";
import { ObtenerFechaActual } from "../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Bienvenida.css";

export default function Bienvenida() {
  const { infSistema, infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const {
    cargandoUltimosDiezPedidos,
    ultimosDiezPedidos,
    buscarNuevamente,
    establecerBuscarNuevamente,
  } = useBuscarUltimosDiezPedidos();
  const {
    resumen,
    cargandoResumen,
    obtenerResumenNuevamente,
    establecerObtenerResumenNuevamente,
  } = useObtenerResumenDiario();

  const IconosPerfil = {
    Administrador: (
      <ion-icon name="shield-checkmark" class="IconoPermisos"></ion-icon>
    ),
    Moderador: <ion-icon name="glasses" class="IconoPermisos"></ion-icon>,
    Usuario: <ion-icon name="person-circle" class="IconoPermisos"></ion-icon>,
    Chofer: <ion-icon name="car" class="IconoPermisos"></ion-icon>,
    Bodega: <ion-icon name="cube" class="IconoPermisos"></ion-icon>,
  };

  setTimeout(() => {
    establecerBuscarNuevamente(!buscarNuevamente);
    establecerObtenerResumenNuevamente(!obtenerResumenNuevamente);
  }, 5000);

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="sparkles"
        seccion={DICCIONARIO_BIENVENIDA[Idioma].Bienvenido}
      />
      <div className="Bienvenida">
        <section className="Bienvenida__Mensaje">
          <img
            src={`${HOST_IMAGENES}/${infSistema.LogoSistema}`}
            alt={infSistema.NombreSistema}
          />
          <p>
            ¡{DICCIONARIO_BIENVENIDA[Idioma].MensajeUno}
            {infSistema.NombreSistema}!
          </p>
          <p>{DICCIONARIO_BIENVENIDA[Idioma].MensajeDos}</p>
          <p>{DICCIONARIO_BIENVENIDA[Idioma].MensajeTres}</p>
        </section>
        <section className="Bienvenida__Perfil">
          <span className="Bienvenida__Perfil--Encabezado">
            <p>{DICCIONARIO_BIENVENIDA[Idioma].Perfil}</p>
            <ion-icon
              name="open"
              onClick={() => (window.location.href = `${HOST}Perfil`)}
            ></ion-icon>
          </span>
          <picture className="Bienvenida__Perfil--Icono">
            <img
              src={`${HOST_IMAGENES}/${infUsuario.Foto}`}
              alt={`${infUsuario.Usuario} Foto`}
            />
          </picture>
          <p className="Bienvenida__Perfil--Nombre">{infUsuario.Usuario}</p>
          {IconosPerfil[infUsuario.Permisos]}
          <small className="Bienvenida__Perfil--Permisos">
            {infUsuario.Permisos}
          </small>
        </section>
        <h1 className="Bienvenida__Titulo">
          {DICCIONARIO_BIENVENIDA[Idioma].ResumenDeHoy}
          <small>{ObtenerFechaActual().split("-").reverse().join("/")}</small>
        </h1>
        {cargandoResumen ? (
          <Cargando ClaseCargando="Chico" />
        ) : (
          <>
            <section className="Secciones__Hoy Pedidos">
              <span className="Secciones__Hoy--Texto">
                <p>{DICCIONARIO_BIENVENIDA[Idioma].Pedidos}</p>
              </span>
              <div className="Secciones__Hoy--Cantidad">
                <p>{resumen.PedidosDeHoy}</p>
              </div>
            </section>
            <section className="Secciones__Hoy Recolecciones">
              <span className="Secciones__Hoy--Texto">
                <p>{DICCIONARIO_BIENVENIDA[Idioma].Recolecciones}</p>
              </span>
              <div className="Secciones__Hoy--Cantidad">
                <p>{resumen.RecoleccionesDeHoy}</p>
              </div>
            </section>
            <section className="Secciones__Hoy Entradas">
              <span className="Secciones__Hoy--Texto">
                <p>{DICCIONARIO_BIENVENIDA[Idioma].EntradasBodega}</p>
              </span>
              <div className="Secciones__Hoy--Cantidad">
                <p>{resumen.EntradasDeHoy}</p>
              </div>
            </section>
            <section className="Secciones__Hoy MovimientosBodega">
              <span className="Secciones__Hoy--Texto">
                <p>{DICCIONARIO_BIENVENIDA[Idioma].MovimientosBodega}</p>
              </span>
              <div className="Secciones__Hoy--Cantidad">
                <p>{resumen.MovimientosDeHoy}</p>
              </div>
            </section>
            <section className="Secciones__Hoy Salidas">
              <span className="Secciones__Hoy--Texto">
                <p>{DICCIONARIO_BIENVENIDA[Idioma].SalidasBodega}</p>
              </span>
              <div className="Secciones__Hoy--Cantidad">
                <p>{resumen.SalidasDeHoy}</p>
              </div>
            </section>
            <section className="Secciones__Hoy Devoluciones">
              <span className="Secciones__Hoy--Texto">
                <p>{DICCIONARIO_BIENVENIDA[Idioma].Devoluciones}</p>
              </span>
              <div className="Secciones__Hoy--Cantidad">
                <p>{resumen.DevolucionesDeHoy}</p>
              </div>
            </section>
          </>
        )}
        <h1 className="Bienvenida__Titulo">
          {DICCIONARIO_BIENVENIDA[Idioma].UltimosDiezPedidos}
          <small>{DICCIONARIO_BIENVENIDA[Idioma].General}</small>
        </h1>
        {cargandoUltimosDiezPedidos ? (
          <Cargando ClaseCargando="Chico" />
        ) : (
          <section className="Bienvenida__UltimasGuias">
            <ul className="Bienvenida__UltimasGuias--Encabezado">
              <p>{DICCIONARIO_BIENVENIDA[Idioma].ListaDePedidos}</p>
              <button
                onClick={() => (window.location.href = `${HOST}Pedidos`)}
                title="Ver todos los pedidos"
              >
                <ion-icon name="add"></ion-icon>
              </button>
            </ul>
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
                  <li className="Bienvenida__UltimasGuias--Cuerpo" key={index}>
                    <span>
                      <ion-icon name="document-text"></ion-icon>
                      {GuiaPedido}
                    </span>
                    <span>
                      <ion-icon name="business"></ion-icon>
                      {NombreAgencia}
                    </span>
                    <span>
                      <ion-icon name="calendar"></ion-icon>
                      {FechaCreacionPedido.slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}{" "}
                      - {HoraCreacionPedido}
                    </span>
                  </li>
                )
              )
            ) : (
              <div className="Bienvenida__UltimasGuias--Cuerpo SinResultados">
                <img src="SinResultados.png" alt="No hay resultados" />
                <small>
                  {DICCIONARIO_RESULTADOS[Idioma].NoResultadosPedidos}
                </small>
                <a href={`${HOST}Pedidos`}>
                  {DICCIONARIO_BIENVENIDA[Idioma].RealizarPedido}
                </a>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
