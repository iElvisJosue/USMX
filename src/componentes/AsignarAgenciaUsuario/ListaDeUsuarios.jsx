/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import MensajeGeneral from "../MensajeGeneral";
import Cargando from "../Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarUsuariosPorFiltro from "../../hooks/useBuscarUsuariosPorFiltro";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AsignarAgenciaUsuario/ListaDeUsuarios.css";

export default function ListaDeUsuarios({
  establecerInformacionDelUsuario,
  establecerVista,
}) {
  const { usuarios, cargandoUsuarios, filtroUsuario, establecerFiltroUsuario } =
    useBuscarUsuariosPorFiltro();
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
    if (usuarios) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        usuarios.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [usuarios]);

  const EstablecerInformacionDelUsuarioSeleccionado = (infUsuario) => {
    toast.success(
      `El usuario ${infUsuario.Usuario.toUpperCase()} fue seleccionado con éxito ✨`
    );
    establecerInformacionDelUsuario(infUsuario);
    establecerVista(1);
  };

  const obtenerUsuarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroUsuario(valorIntroducido);
      reiniciarValores();
    }
  };

  if (cargandoUsuarios) return <Cargando />;

  return (
    <div className="ListaDeUsuarios">
      <h1 className="ListaDeUsuarios__Titulo">Selecciona el usuario</h1>
      <span className="ListaDeUsuarios__Buscar">
        <input
          type="text"
          placeholder="Buscar usuario"
          onChange={obtenerUsuarios}
        />
        <span className="ListaDeUsuarios__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {usuarios.length > 0 ? (
        <>
          <small className="ListaDeUsuarios__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {usuarios.length} resultados{" "}
          </small>
          <div className="ListaDeUsuarios__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeUsuarios__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < usuarios.length && (
              <button
                className="ListaDeUsuarios__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {usuarios
            .slice(indiceInicial, indiceFinal)
            .map((infUsuario, index) => (
              <section
                className="ListaDeUsuarios__Usuario"
                key={index}
                onClick={() =>
                  EstablecerInformacionDelUsuarioSeleccionado(infUsuario)
                }
              >
                <ion-icon name="person-circle"></ion-icon>
                <p>{infUsuario.Usuario}</p>
              </section>
            ))}
          <small className="ListaDeUsuarios__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados para "${filtroUsuario}"`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Registrar-Usuario"}
          TextoBoton={"Registrar Usuario"}
        />
      )}
    </div>
  );
}
