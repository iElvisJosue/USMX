// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_APARIENCIA } from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Apariencia.css";

export default function Apariencia() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { infUsuario } = useUsuarios();
  const {
    modoOscuro,
    obtenerModoOscuro,
    establecerObtenerModoOscuro,
    ActualizarModoOscuro,
    idioma,
    obtenerIdioma,
    establecerObtenerIdioma,
    ActualizarIdioma,
  } = useConfiguracion();

  const ActualizarElModoOscuroDelUsuario = async (ValorModoOscuro) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await ActualizarModoOscuro({
        CookieConToken: COOKIE_CON_TOKEN,
        idUsuario: infUsuario.idUsuario,
        ModoOscuro: ValorModoOscuro,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerModoOscuro(!obtenerModoOscuro);
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
        CookieConToken: COOKIE_CON_TOKEN,
        idUsuario: infUsuario.idUsuario,
        Idioma: valorIdioma,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerIdioma(!obtenerIdioma);
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
        icono="color-palette"
        seccion={DICCIONARIO_APARIENCIA[idioma].Apariencia}
      />
      <div className="Apariencia">
        <h2 className="Apariencia__Titulo">
          {DICCIONARIO_APARIENCIA[idioma].Apariencia}
        </h2>
        <h4 className="Apariencia__Subtitulo">
          {DICCIONARIO_APARIENCIA[idioma].DescripcionApariencia}
        </h4>
        <hr className="Apariencia__Separador" />
        <section className="Apariencia__Cuerpo">
          <div className="Apariencia__Cuerpo__Texto">
            <b>{DICCIONARIO_APARIENCIA[idioma].IdiomaSistema}</b>
            <p>{DICCIONARIO_APARIENCIA[idioma].DescripcionIdiomaSistema}</p>
          </div>
          <div className="Apariencia__Cuerpo__Ejemplos">
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen Idioma ${
                idioma === "es" && "Seleccionado"
              }`}
              onClick={
                idioma === "es"
                  ? undefined
                  : () => ActualizarElIdiomaDelUsuario("es")
              }
            >
              <img src="BanderaMexico.png" alt="Idioma español" />
              <b>{DICCIONARIO_APARIENCIA[idioma].IdiomaEspanol}</b>
            </picture>
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen Idioma ${
                idioma === "en" && "Seleccionado"
              }`}
              onClick={
                idioma === "en"
                  ? undefined
                  : () => ActualizarElIdiomaDelUsuario("en")
              }
            >
              <img src="BanderaUSA.png" alt="Idioma inglés" />
              <b>{DICCIONARIO_APARIENCIA[idioma].IdiomaIngles}</b>
            </picture>
          </div>
        </section>
        <hr className="Apariencia__Separador" />
        <section className="Apariencia__Cuerpo">
          <div className="Apariencia__Cuerpo__Texto">
            <b>{DICCIONARIO_APARIENCIA[idioma].TemaSistema}</b>
            <p>{DICCIONARIO_APARIENCIA[idioma].DescripcionTemaSistema}</p>
          </div>
          <div className="Apariencia__Cuerpo__Ejemplos">
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen ${
                modoOscuro === 0 && "Oscuro"
              }`}
              onClick={
                modoOscuro === 0
                  ? undefined
                  : () => ActualizarElModoOscuroDelUsuario(false)
              }
            >
              <img src="TemaClaro.png" alt="Tema Claro" />
              <b>{DICCIONARIO_APARIENCIA[idioma].TemaClaro}</b>
            </picture>
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen ${
                modoOscuro === 1 && "Oscuro"
              }`}
              onClick={
                modoOscuro === 1
                  ? undefined
                  : () => ActualizarElModoOscuroDelUsuario(true)
              }
            >
              <img src="TemaOscuro.png" alt="Tema Oscuro" />
              <b>{DICCIONARIO_APARIENCIA[idioma].TemaOscuro}</b>
            </picture>
          </div>
        </section>
      </div>
    </main>
  );
}
