/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect, useState } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOcurresActivosPorFiltro from "../../hooks/useBuscarOcurresActivosPorFiltro";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/SeleccionarOcurre.css";
export default function SeleccionarOcurre({
  establecerVistaDestinatario,
  establecerDestinatario,
  establecerPaso,
  agencia,
  paso,
}) {
  const [infOcurre, establecerInfOcurre] = useState(null);
  const [idOcurreSeleccionado, establecerIdOcurreSeleccionado] = useState(null);
  const {
    ocurresActivos,
    cargandoOcurresActivos,
    establecerFiltroOcurresActivos,
  } = useBuscarOcurresActivosPorFiltro();

  useEffect(() => {
    if (ocurresActivos) {
      const cantidadDePaginasEnOcurresActivos = Math.ceil(
        ocurresActivos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnOcurresActivos);
    }
  }, [ocurresActivos]);

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

  const ObtenerOcurres = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroOcurresActivos(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstablecerElOcurreSeleccionado = (ocurre) => {
    establecerInfOcurre(ocurre);
    establecerIdOcurreSeleccionado(ocurre.idOcurre);
    toast.success(
      `Ocurre ${ocurre.NombreOcurre.toUpperCase()} seleccionado con éxito ✨`
    );
  };

  const ValidarCamposOcurre = () => {
    const NombreDestinatario =
      document.getElementById("NombreDestinatario").value;
    const ApellidoPaternoDestinatario = document.getElementById(
      "ApellidoPaternoDestinatario"
    ).value;
    const ApellidoMaternoDestinatario = document.getElementById(
      "ApellidoMaternoDestinatario"
    ).value;
    if (idOcurreSeleccionado === null) {
      return toast.error("Debe seleccionar un ocurre para continuar. ❌");
    }
    if (
      NombreDestinatario === "" ||
      ApellidoPaternoDestinatario === "" ||
      ApellidoMaternoDestinatario === ""
    ) {
      return toast.error("Debe ingresar todos los campos. ❌");
    }
    // NO PONEMOS EL ID DEL DESTINATARIO COMO FALSO PARA QUE SE ALMACENE EN LA BASE DE DATOS
    // Y PARA QUE NO SE CREE LA UNION CON LA AGENCIA CORRESPONDIENTE
    establecerDestinatario({
      NombreDestinatario,
      ApellidoPaternoDestinatario,
      ApellidoMaternoDestinatario,
      TelefonoCasaDestinatario: infOcurre.TelefonoOcurre,
      CelularDestinatario: infOcurre.CelularOcurre || "",
      CorreoDestinatario: infOcurre.CorreoOcurre,
      ColoniaDestinatario: infOcurre.ColoniaOcurre,
      MunicipioDelegacionDestinatario:
        infOcurre.MunicipioDelegacionOcurre || "",
      CodigoPostalDestinatario: infOcurre.CodigoPostalOcurre,
      CiudadDestinatario: infOcurre.CiudadOcurre,
      EstadoDestinatario: infOcurre.EstadoOcurre,
      DireccionDestinatario: infOcurre.DireccionOcurre,
      ReferenciaDestinatario: infOcurre.ReferenciaOcurre,
    });
    toast.success("Paso 2 (Destinatario) completado con éxito ✨");
    establecerPaso(paso + 1);
  };

  if (cargandoOcurresActivos) return <Cargando />;

  return (
    <section className="SeleccionarOcurre">
      <span className="SeleccionarOcurre__Opciones">
        <button
          type="button"
          className="SeleccionarOcurre__Opciones--Boton Registrar"
          onClick={() => establecerVistaDestinatario(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
        <button
          type="button"
          className="SeleccionarOcurre__Opciones--Boton Lista"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarOcurre__Titulo">Ingresa el nombre</h1>
      <span className="SeleccionarOcurre__Campo Nombre">
        <p>
          <ion-icon name="person"></ion-icon>Nombre
        </p>
        <input
          id="NombreDestinatario"
          type="text"
          name="NombreDestinatario"
          placeholder="Escriba aquí..."
        />
      </span>
      <span className="SeleccionarOcurre__Campo">
        <p>
          <ion-icon name="man"></ion-icon>Apellido paterno
        </p>
        <input
          id="ApellidoPaternoDestinatario"
          type="text"
          name="ApellidoPaternoDestinatario"
          placeholder="Escriba aquí..."
        />
      </span>
      <span className="SeleccionarOcurre__Campo">
        <p>
          <ion-icon name="woman"></ion-icon>Apellido materno
        </p>
        <input
          id="ApellidoMaternoDestinatario"
          type="text"
          name="ApellidoMaternoDestinatario"
          placeholder="Escriba aquí..."
        />
      </span>
      <h1 className="SeleccionarOcurre__Titulo">Seleccionar Ocurre</h1>
      <span className="SeleccionarOcurre__Buscar">
        <input
          type="text"
          placeholder="Buscar Ocurre"
          onChange={ObtenerOcurres}
        />
        <span className="SeleccionarOcurre__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ocurresActivos.length > 0 ? (
        <>
          <small className="SeleccionarOcurre__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {ocurresActivos.length} resultados
          </small>
          <div className="SeleccionarOcurre__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                type="button"
                className="SeleccionarOcurre__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back"></ion-icon>
              </button>
            )}
            {indiceFinal < ocurresActivos.length && (
              <button
                type="button"
                className="SeleccionarOcurre__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward"></ion-icon>
              </button>
            )}
          </div>
          {ocurresActivos
            .slice(indiceInicial, indiceFinal)
            .map((ocurre, index) => (
              <section
                className={`SeleccionarOcurre__Ocurre ${
                  idOcurreSeleccionado === ocurre.idOcurre && "Seleccionado"
                }`}
                key={index}
                onClick={() => EstablecerElOcurreSeleccionado(ocurre)}
              >
                <ion-icon name="alert-circle"></ion-icon>
                <p>{ocurre.NombreOcurre}</p>
                <ion-icon name="location"></ion-icon>
                <p>{ocurre.DireccionOcurre}</p>
                <p>
                  {ocurre.CiudadOcurre}, {ocurre.EstadoOcurre}{" "}
                  {ocurre.CodigoPostalOcurre}
                </p>
                <ion-icon name="business"></ion-icon>
                <p>{ocurre.OperadorLogisticoOcurre}</p>
              </section>
            ))}
          <small className="SeleccionarOcurre__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
          <footer className="SeleccionarOcurre__Footer">
            <button
              className="SeleccionarOcurre__Footer__Boton Regresar"
              onClick={() => establecerPaso(paso - 1)}
              type="button"
            >
              Regresar
            </button>
            <button
              type="submit"
              className="SeleccionarOcurre__Footer__Boton Siguiente"
              onClick={ValidarCamposOcurre}
            >
              Siguiente
            </button>
          </footer>
          <AgenciaSeleccionada NombreAgencia={agencia?.NombreAgencia} />
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
