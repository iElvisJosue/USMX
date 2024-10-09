/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { CamposMovimientos } from "../../helpers/Movimientos/CamposMovimientos";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/Movimientos/RegistrarMovimientos.css";

export default function RegistrarMovimiento({
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
}) {
  const { RegistrarMovimiento } = useOperaciones();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardarInformacionDelMovimiento = handleSubmit(async (info) => {
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarMovimiento(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerMovimientosNuevamente(!obtenerMovimientosNuevamente);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const ReiniciarFormulario = () => {
    reset();
  };

  const MensajeDeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="Movimientos__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarMovimiento"
      onSubmit={GuardarInformacionDelMovimiento}
    >
      <h1 className="RegistrarMovimiento__Titulo">Registrar Movimiento</h1>
      {CamposMovimientos.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            tipoCampo,
            placeholderCampo,
            claseCampo,
            validadorCampo,
          },
          index
        ) => (
          <span className={claseCampo} key={index}>
            <p>
              <ion-icon name={iconoCampo}></ion-icon> {tituloCampo}
            </p>
            {tipoCampo !== "select" ? (
              <>
                <input
                  id={idCampo}
                  type={tipoCampo}
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                {MensajeDeError(nombreCampo)}
              </>
            ) : (
              <>
                <select
                  name={nombreCampo}
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="No">No</option>
                  <option value="Si">Si</option>
                </select>
                {MensajeDeError(nombreCampo)}
              </>
            )}
          </span>
        )
      )}
      <footer className="RegistrarMovimiento__Footer">
        <button
          type="button"
          className="RegistrarMovimiento__Footer__Boton Cancelar"
          onClick={ReiniciarFormulario}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="RegistrarMovimiento__Footer__Boton Guardar"
        >
          Guardar
        </button>
      </footer>
    </form>
  );
}
