/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_SELECCIONAR_AGENCIA_PEDIDO,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import MensajeGeneral from "../../Globales/MensajeGeneral";
import Cargando from "../../Globales/Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasPorFiltroYTipoDeUsuario from "../../../hooks/Pedidos/useBuscarAgenciasPorFiltroYTipoDeUsuario";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { ESTILOS_SUCCESS } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/SeleccionarAgenciaPedido.css";

export default function SeleccionarAgenciaPedido({
  Idioma,
  establecerAgencia,
  infUsuario,
  FuncionParaRealizar,
  establecerPaso,
}) {
  const { agencias, cargandoAgencias, establecerFiltroAgencias } =
    useBuscarAgenciasPorFiltroYTipoDeUsuario();
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
    if (infUsuario.Permisos != "Administrador" && agencias.length === 1) {
      establecerAgencia(agencias[0]);
      establecerPaso(1);
      toast.success(
        `¡La agencia ${agencias[0].NombreAgencia.toUpperCase()} seleccionada con éxito!`,
        {
          style: ESTILOS_SUCCESS,
        }
      );
    }
    if (agencias) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        agencias.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [agencias, infUsuario.Permisos]);

  const obtenerAgencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgencias(valorIntroducido);
      reiniciarValores();
    }
  };

  if (cargandoAgencias) return <Cargando />;

  return (
    <div className="SeleccionarAgenciaPedido">
      <h1 className="SeleccionarAgenciaPedido__Titulo">
        {DICCIONARIO_SELECCIONAR_AGENCIA_PEDIDO[Idioma].SeleccionaUnaAgencia}
      </h1>
      {infUsuario.Permisos === "Administrador" && (
        <span className="SeleccionarAgenciaPedido__Buscar">
          <input
            type="text"
            placeholder={
              DICCIONARIO_SELECCIONAR_AGENCIA_PEDIDO[Idioma].BuscarAgencia
            }
            onChange={obtenerAgencias}
          />
          <span className="SeleccionarAgenciaPedido__Buscar__Lupa">
            <ion-icon name="search"></ion-icon>
          </span>
        </span>
      )}
      {infUsuario.Permisos === "Administrador" &&
        (agencias.length > 0 ? (
          <>
            <small className="SeleccionarAgenciaPedido__TextoResultados">
              <ion-icon name="search-circle"></ion-icon>
              {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {agencias.length}{" "}
              {DICCIONARIO_RESULTADOS[Idioma].Resultados}
            </small>
            <div className="SeleccionarAgenciaPedido__BotonesDePaginacion">
              {indiceInicial >= CantidadParaMostrar && (
                <button
                  className="SeleccionarAgenciaPedido__BotonesDePaginacion--Boton Anterior"
                  onClick={MostrarVeinticincoMenos}
                >
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
              )}
              {indiceFinal < agencias.length && (
                <button
                  className="SeleccionarAgenciaPedido__BotonesDePaginacion--Boton Siguiente"
                  onClick={MostrarVeinticincoMas}
                >
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
              )}
            </div>
            {agencias
              .slice(indiceInicial, indiceFinal)
              .map((agencia, index) => (
                <section
                  className="SeleccionarAgenciaPedido__Agencia"
                  key={index}
                  onClick={() => FuncionParaRealizar(agencia)}
                >
                  <ion-icon name="business"></ion-icon>
                  <p>
                    {agencia.idEspecial} <br /> {agencia.NombreAgencia}
                  </p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {agencia.EstadoAgencia}, {agencia.CiudadAgencia}
                  </p>
                  <p>
                    {agencia.DireccionAgencia} {agencia.CodigoPostalAgencia}
                  </p>
                </section>
              ))}
            <small className="SeleccionarAgenciaPedido__TextoPaginas">
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
            UrlBoton={"/Agencias"}
            TextoBoton={
              DICCIONARIO_SELECCIONAR_AGENCIA_PEDIDO[Idioma].RegistrarAgencia
            }
          />
        ))}
      {infUsuario.Permisos !== "Administrador" && (
        <>
          {agencias.length === 0 && (
            <MensajeGeneral
              Imagen={"SinResultados.png"}
              Texto={DICCIONARIO_SELECCIONAR_AGENCIA_PEDIDO[Idioma].SinAgencias}
            />
          )}
          {agencias.length > 1 &&
            agencias.slice(indiceInicial, indiceFinal).map((agencia, index) => (
              <section
                className="SeleccionarAgenciaPedido__Agencia"
                key={index}
                onClick={() => FuncionParaRealizar(agencia)}
              >
                <ion-icon name="business"></ion-icon>
                <p>{agencia.NombreAgencia}</p>
                <ion-icon name="location"></ion-icon>
                <p>{agencia.DireccionAgencia}</p>
                <p>
                  {agencia.CiudadAgencia}, {agencia.EstadoAgencia}{" "}
                  {agencia.CodigoPostalAgencia}
                </p>
              </section>
            ))}
        </>
      )}
    </div>
  );
}
