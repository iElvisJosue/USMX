// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Configuracion/Apariencia.css";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../../context/ConfiguracionContext";
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

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
    <section className="Configuracion__Apariencia">
      <div className="Configuracion__Apariencia__Texto">
        <b>Tema de la interfaz</b>
        <p>Selecciona el tema de la interfaz de la aplicación.</p>
      </div>
      <div className="Configuracion__Apariencia__Ejemplos">
        <picture
          className={`Configuracion__Apariencia__Ejemplo--Imagen ${
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
          className={`Configuracion__Apariencia__Ejemplo--Imagen ${
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
  );
}
