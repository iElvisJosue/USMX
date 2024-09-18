/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LAS AYUDAS
import { CamposDestinatario } from "../../helpers/RealizarPedido/CamposDestinatario";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/InformacionDelDestinatario.css";

export default function InformacionDelDestinatario({
  paso,
  establecerPaso,
  destinatario,
  establecerDestinatario,
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

  const GuardarInformacionDelDestinatario = handleSubmit(async (data) => {
    establecerDestinatario(data);
    establecerPaso(paso + 1);
    toast.success("Destinatario completado con éxito ✨");
  });

  useEffect(() => {
    setValue("Nombre", destinatario?.Nombre);
    setValue("ApellidoPaterno", destinatario?.ApellidoPaterno);
    setValue("ApellidoMaterno", destinatario?.ApellidoMaterno);
    setValue("Telefono", destinatario?.Telefono);
    setValue("Celular", destinatario?.Celular);
    setValue("Correo", destinatario?.Correo);
    setValue("Colonia", destinatario?.Colonia);
    setValue("MunicipioDelegacion", destinatario?.MunicipioDelegacion);
    setValue("CodigoPostal", destinatario?.CodigoPostal);
    setValue("Ciudad", destinatario?.Ciudad);
    setValue("Estado", destinatario?.Estado);
    setValue("Direccion", destinatario?.Direccion);
    setValue("Referencia", destinatario?.Referencia);
  }, []);

  return (
    <form
      className="InformacionDelDestinatario"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      <AgenciaSeleccionada
        NombreAgencia={agencia?.NombreAgencia}
        colSpan="Tres"
      />
      <h1 className="InformacionDelDestinatario__Titulo">
        Información del destinatario
      </h1>
      {CamposDestinatario.map(
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
                  name={nombreCampo}
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
      <footer className="InformacionDelDestinatario__Footer">
        <button
          className="InformacionDelDestinatario__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="InformacionDelDestinatario__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
    </form>
  );
}
