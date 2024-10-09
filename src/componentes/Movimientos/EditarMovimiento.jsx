/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { CamposMovimientos } from "../../helpers/Movimientos/CamposMovimientos";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR (ESTILOS RECICLADOS)
import "../../estilos/componentes/Movimientos/RegistrarMovimientos.css";

export default function EditarMovimiento({
  informacionDelMovimiento,
  establecerVista,
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
}) {
  const { EditarMovimiento } = useOperaciones();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("EstadoMovimiento", informacionDelMovimiento?.EstadoMovimiento);
    setValue("OrigenMovimiento", informacionDelMovimiento?.OrigenMovimiento);
    setValue(
      "DetallesMovimiento",
      informacionDelMovimiento?.DetallesMovimiento
    );
    setValue(
      "PorDefectoMovimiento",
      informacionDelMovimiento?.PorDefectoMovimiento
    );
  }, []);

  const GuardarInformacionDelMovimiento = handleSubmit(async (info) => {
    try {
      info.idListaMovimiento = informacionDelMovimiento?.idListaMovimiento;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await EditarMovimiento(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerMovimientosNuevamente(!obtenerMovimientosNuevamente);
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

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
      <div className="RegistrarMovimiento__Opciones">
        <button
          className="RegistrarMovimiento__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="RegistrarMovimiento__Titulo">Editar Movimiento</h1>
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
          type="submit"
          className="RegistrarMovimiento__Footer__Boton Guardar"
        >
          Actualizar
        </button>
      </footer>
    </form>
  );
}
