// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../context/OcurreContext";

// IMPORTAMOS LAS AYUDAS
import { CamposOcurre } from "../../helpers/Ocurre/CamposOcurre";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/Ocurre/InformacionOcurre.css";

export default function InformacionOcurre() {
  const { RegistrarOcurre } = useOcurre();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardarInformacionDelOcurre = handleSubmit(async (info) => {
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarOcurre(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarOcurre__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  const CancelarRegistro = () => {
    reset();
  };

  return (
    <form className="InformacionOcurre" onSubmit={GuardarInformacionDelOcurre}>
      <h1 className="InformacionOcurre__Titulo">Registrar Ocurre</h1>
      {CamposOcurre.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            placeholderCampo,
            tipoCampo,
            claseCampo,
            validadorCampo,
          },
          index
        ) => (
          <span className={claseCampo} key={index}>
            <p>
              <ion-icon name={iconoCampo}></ion-icon> {tituloCampo}
            </p>
            {tipoCampo === "text" && (
              <>
                <input
                  id={idCampo}
                  type="text"
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                {MensajeError(nombreCampo)}
              </>
            )}
            {tipoCampo === "select" && (
              <>
                <select
                  name={nombreCampo}
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="FedEx">FedEx</option>
                  <option value="Estafeta">Estafeta</option>
                  <option value="DHL">DHL</option>
                  <option value="UPS">UPS</option>
                  <option value="Paquetexpress">Paquetexpress</option>
                  <option value="Redpack">Redpack</option>
                  <option value="99 Minutos">99 Minutos</option>
                </select>
                {MensajeError(nombreCampo)}
              </>
            )}
          </span>
        )
      )}
      <footer className="InformacionOcurre__Footer">
        <button
          className="InformacionOcurre__Footer__Boton Regresar"
          type="button"
          onClick={CancelarRegistro}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="InformacionOcurre__Footer__Boton Siguiente"
        >
          Guardar
        </button>
      </footer>
    </form>
  );
}
