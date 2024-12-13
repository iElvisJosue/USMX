// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_APARIENCIA } from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Apariencia.css";

export default function Apariencia() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const {
    infUsuario,
    ActualizarModoOscuro,
    ActualizarIdioma,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = useSistema();

  const ActualizarElModoOscuroDelUsuario = async (ValorModoOscuro) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarModoOscuro({
        idUsuario: infUsuario.idUsuario,
        ModoOscuro: ValorModoOscuro,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  };
  const ActualizarElIdiomaDelUsuario = async (valorIdioma) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarIdioma({
        idUsuario: infUsuario.idUsuario,
        Idioma: valorIdioma,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  };

  return (
    <main className="Main">
      <Menu />
      <Encabezado
        icono="desktop"
        seccion={DICCIONARIO_APARIENCIA[infUsuario.Idioma].Sistema}
        subseccion={DICCIONARIO_APARIENCIA[infUsuario.Idioma].Apariencia}
      />
      <div className="Apariencia">
        <h2 className="Apariencia__Titulo">
          {DICCIONARIO_APARIENCIA[infUsuario.Idioma].Apariencia}
        </h2>
        <h4 className="Apariencia__Subtitulo">
          {DICCIONARIO_APARIENCIA[infUsuario.Idioma].DescripcionApariencia}
        </h4>
        <hr className="Apariencia__Separador" />
        <section className="Apariencia__Cuerpo">
          <div className="Apariencia__Cuerpo__Texto">
            <b>{DICCIONARIO_APARIENCIA[infUsuario.Idioma].IdiomaSistema}</b>
            <p>
              {
                DICCIONARIO_APARIENCIA[infUsuario.Idioma]
                  .DescripcionIdiomaSistema
              }
            </p>
          </div>
          <div className="Apariencia__Cuerpo__Ejemplos">
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen Idioma ${
                infUsuario.Idioma === "es" && "Seleccionado"
              }`}
              onClick={
                infUsuario.Idioma === "es"
                  ? undefined
                  : () => ActualizarElIdiomaDelUsuario("es")
              }
            >
              <img src="BanderaMexico.png" alt="Idioma español" />
              <b>{DICCIONARIO_APARIENCIA[infUsuario.Idioma].IdiomaEspanol}</b>
            </picture>
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen Idioma ${
                infUsuario.Idioma === "en" && "Seleccionado"
              }`}
              onClick={
                infUsuario.Idioma === "en"
                  ? undefined
                  : () => ActualizarElIdiomaDelUsuario("en")
              }
            >
              <img src="BanderaUSA.png" alt="Idioma inglés" />
              <b>{DICCIONARIO_APARIENCIA[infUsuario.Idioma].IdiomaIngles}</b>
            </picture>
          </div>
        </section>
        <hr className="Apariencia__Separador" />
        <section className="Apariencia__Cuerpo">
          <div className="Apariencia__Cuerpo__Texto">
            <b>{DICCIONARIO_APARIENCIA[infUsuario.Idioma].TemaSistema}</b>
            <p>
              {DICCIONARIO_APARIENCIA[infUsuario.Idioma].DescripcionTemaSistema}
            </p>
          </div>
          <div className="Apariencia__Cuerpo__Ejemplos">
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen ${
                infUsuario.ModoOscuro === 0 && "Oscuro"
              }`}
              onClick={
                infUsuario.ModoOscuro === 0
                  ? undefined
                  : () => ActualizarElModoOscuroDelUsuario(false)
              }
            >
              <img src="TemaClaro.png" alt="Tema Claro" />
              <b>{DICCIONARIO_APARIENCIA[infUsuario.Idioma].TemaClaro}</b>
            </picture>
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen ${
                infUsuario.ModoOscuro === 1 && "Oscuro"
              }`}
              onClick={
                infUsuario.ModoOscuro === 1
                  ? undefined
                  : () => ActualizarElModoOscuroDelUsuario(true)
              }
            >
              <img src="TemaOscuro.png" alt="Tema Oscuro" />
              <b>{DICCIONARIO_APARIENCIA[infUsuario.Idioma].TemaOscuro}</b>
            </picture>
          </div>
        </section>
      </div>
    </main>
  );
}
