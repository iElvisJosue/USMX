// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";
import { useGlobal } from "../context/GlobalContext";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../estilos/Vistas/Apariencia.css";

export default function Apariencia() {
  const { usuario } = useGlobal();
  const {
    modoOscuro,
    obtenerModoOscuro,
    establecerObtenerModoOscuro,
    ActualizarModoOscuro,
  } = useConfiguracion();

  const ActualizarElModoOscuroDelUsuario = async (ValorModoOscuro) => {
    try {
      const res = await ActualizarModoOscuro({
        CookieConToken: COOKIE_CON_TOKEN,
        idUsuario: usuario.idUsuario,
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
    }
  };

  return (
    <main className="Main">
      <Menu />
      <Encabezado icono="color-palette" seccion="Apariencia" />
      <div className="Apariencia">
        <h2 className="Apariencia__Titulo">Apariencia</h2>
        <h4 className="Apariencia__Subtitulo">
          Administre la configuración y preferencias de la apariencia del
          sistema.
        </h4>
        <hr className="Apariencia__Separador" />
        <section className="Apariencia__Cuerpo">
          <div className="Apariencia__Cuerpo__Texto">
            <b>Tema de la interfaz</b>
            <p>Selecciona el tema de la interfaz de la aplicación.</p>
          </div>
          <div className="Apariencia__Cuerpo__Ejemplos">
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen ${
                modoOscuro === 1 && "Oscuro"
              }`}
              onClick={
                modoOscuro === 0
                  ? () => ActualizarElModoOscuroDelUsuario(true)
                  : undefined
              }
            >
              <img src="TemaOscuro.png" alt="Tema Oscuro" />
              <b>Tema Oscuro</b>
            </picture>
            <picture
              className={`Apariencia__Cuerpo__Ejemplo--Imagen ${
                modoOscuro === 0 && "Oscuro"
              }`}
              onClick={
                modoOscuro === 1
                  ? () => ActualizarElModoOscuroDelUsuario(false)
                  : undefined
              }
            >
              <img src="TemaClaro.png" alt="Tema Claro" />
              <b>Tema Claro</b>
            </picture>
          </div>
        </section>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
