/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LAS AYUDAS
import { CamposRemitente } from "../../helpers/RealizarPedido/CamposRemitente";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/InformacionDelRemitente.css";

export default function InformacionDelRemitente({
  paso,
  establecerPaso,
  remitente,
  establecerRemitente,
  agencia,
}) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("Remitente completado con éxito ✨");
  });

  useEffect(() => {
    setValue("Nombre", remitente?.Nombre);
    setValue("Apellidos", remitente?.Apellidos);
    setValue("Telefono", remitente?.Telefono);
    setValue("Celular", remitente?.Celular);
    setValue("Correo", remitente?.Correo);
    setValue("CodigoPostal", remitente?.CodigoPostal);
    setValue("Ciudad", remitente?.Ciudad);
    setValue("Estado", remitente?.Estado);
    setValue("Direccion", remitente?.Direccion);
    setValue("Referencia", remitente?.Referencia);
  }, []);

  return (
    <form
      className="InformacionDelRemitente"
      onSubmit={GuardaInformacionDelRemitente}
    >
      <AgenciaSeleccionada
        NombreAgencia={agencia?.NombreAgencia}
        colSpan="Tres"
      />

      <h1 className="InformacionDelRemitente__Titulo">
        Información del remitente
      </h1>
      {CamposRemitente.map(
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
            {tipoCampo === "text" && (
              <>
                <input
                  id={idCampo}
                  type="text"
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                <ErrorMessage
                  errors={errors}
                  name={nombreCampo}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="RealizarPedido__MensajeDeError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )}
            {tipoCampo === "select" && (
              <>
                <select
                  name=""
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="">Elige una opción</option>
                  <option value="Prueba">Opción de prueba</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name={nombreCampo}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="RealizarPedido__MensajeDeError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )}
          </span>
        )
      )}
      <footer className="InformacionDelRemitente__Footer">
        <button
          type="button"
          className="InformacionDelRemitente__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
        >
          Regresar
        </button>
        <button
          type="submit"
          className="InformacionDelRemitente__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
    </form>
  );
}
