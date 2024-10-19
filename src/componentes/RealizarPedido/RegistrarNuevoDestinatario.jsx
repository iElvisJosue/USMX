/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import { CamposDestinatario } from "../../helpers/RealizarPedido/CamposDestinatario";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/RegistrarNuevoDestinatario.css";

export default function RegistrarNuevoDestinatario({
  establecerVistaDestinatario,
  destinatario,
  establecerDestinatario,
  establecerPaso,
  agencia,
  paso,
}) {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  // ESTADOS PARA ALMACENAR LOS DATOS DE LA DIRECCIÓN
  const [codigoDelPaisSeleccionado, establecerCodigoDelPaisSeleccionado] =
    useState(null);
  const [idEstado, establecerIdEstado] = useState(null);
  const [cpColonia, establecerCpColonia] = useState(null);
  // ESTE ESTADO ES PARA NO MOSTRAR UN CAMPO EN BLANCO A LA HORA DE ITERAR
  // MUCHO CON LA COLONIA Y EL CP
  const [coloniaSeleccionada, establecerColoniaSeleccionada] = useState("");

  // OBTENEMOS LOS DATOS
  const { paises } = useObtenerPaisesActivos();
  const { estadosPorCodigoDelPais } = useObtenerEstadosPorCodigoDelPais(
    codigoDelPaisSeleccionado
  );
  const { ciudadesPorEstado } = useObtenerCiudadesPorEstado(idEstado);
  const { coloniasPorCP } = useObtenerColoniasPorCP(cpColonia);

  useEffect(() => {
    if (coloniasPorCP?.length > 0) {
      establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia); // Selecciona la primera colonia
    }
  }, [coloniasPorCP]);

  useEffect(() => {
    if (destinatario?.idDestinatario === false) {
      setValue("NombreDestinatario", destinatario?.NombreDestinatario);
      setValue(
        "ApellidoPaternoDestinatario",
        destinatario?.ApellidoPaternoDestinatario
      );
      setValue(
        "ApellidoMaternoDestinatario",
        destinatario?.ApellidoMaternoDestinatario
      );
      setValue(
        "TelefonoCasaDestinatario",
        destinatario?.TelefonoCasaDestinatario
      );
      setValue("CelularDestinatario", destinatario?.CelularDestinatario);
      setValue("CorreoDestinatario", destinatario?.CorreoDestinatario);
      setValue(
        "MunicipioDelegacionDestinatario",
        destinatario?.MunicipioDelegacionDestinatario
      );
      setValue("ReferenciaDestinatario", destinatario?.ReferenciaDestinatario);
    }
  }, []);

  const GuardarInformacionDelDestinatario = handleSubmit(async (data) => {
    // PONEMOS EL ID DEL DESTINATARIO COMO FALSO PARA QUE SE ALMACENE EN LA BASE DE DATOS
    // Y SE CREE UNA UNION CON LA AGENCIA CORRESPONDIENTE
    data.idDestinatario = false;
    const { CodigoPais } = DividirCodigoDelNombrePais(data.PaisDestinatario);
    data.CodigoPaisDestinatario = CodigoPais;
    establecerDestinatario(data);
    establecerPaso(paso + 1);
    toast.success("Destinatario completado con éxito ✨");
  });

  const EstablecerCodigoPais = (InfPais) => {
    ReiniciarValoresDeLasDirecciones();
    const { CodigoPais } = DividirCodigoDelNombrePais(InfPais);
    establecerCodigoDelPaisSeleccionado(CodigoPais);
  };

  const DividirCodigoDelNombrePais = (PaisPorDividir) => {
    // ESTAMOS OBTENIENDO POR EJEMPLO: MX | Mexico
    const CodigoPais = PaisPorDividir.split(" | ")[0];
    const NombrePais = PaisPorDividir.split(" | ")[1];
    return { CodigoPais, NombrePais };
  };

  const ReiniciarValoresDeLasDirecciones = () => {
    reset({
      EstadoDestinatario: "",
      CiudadDestinatario: "",
      CodigoPostalDestinatario: "",
      DireccionDestinatario: "",
    });

    establecerCodigoDelPaisSeleccionado(null);
    establecerIdEstado(null);
    establecerCpColonia(null);
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RealizarPedido__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarNuevoDestinatario"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      <span className="RegistrarNuevoDestinatario__Opciones">
        <button
          type="button"
          className="RegistrarNuevoDestinatario__Opciones--Boton Lista"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
        <button
          type="button"
          className="RegistrarNuevoDestinatario__Opciones--Boton Ocurre"
          onClick={() => establecerVistaDestinatario(2)}
        >
          <ion-icon name="alert-circle"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoDestinatario__Titulo">
        Registrar nuevo destinatario
      </h1>
      {CamposDestinatario.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
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

            <input
              id={idCampo}
              type="text"
              name={nombreCampo}
              placeholder={placeholderCampo}
              {...register(nombreCampo, validadorCampo)}
            />
            {MensajeError(nombreCampo)}
          </span>
        )
      )}
      {paises && (
        <span
          className="RegistrarNuevoDestinatario__Campo"
          onChange={(e) => EstablecerCodigoPais(e.target.value)}
        >
          <p>
            <ion-icon name="flag"></ion-icon> País
          </p>
          <select
            name="PaisDestinatario"
            id="PaisDestinatario"
            {...register("PaisDestinatario", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona un país
            </option>
            {paises.map((pais) => (
              <option
                key={pais.idPais}
                value={`${pais.CodigoPais} | ${pais.NombrePais}`}
              >
                {pais.CodigoPais} | {pais.NombrePais}
              </option>
            ))}
          </select>
          {MensajeError("PaisDestinatario")}
        </span>
      )}
      {estadosPorCodigoDelPais && (
        <span className="RegistrarNuevoDestinatario__Campo">
          <p>
            <ion-icon name="location"></ion-icon> Estado
          </p>
          <select
            name="EstadoDestinatario"
            id="EstadoDestinatario"
            {...register("EstadoDestinatario", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
            defaultValue={""}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              establecerIdEstado(selectedOption.id);
              document.getElementById("CiudadDestinatario").value = "";
            }}
          >
            <option value="" disabled>
              Selecciona un estado
            </option>
            {estadosPorCodigoDelPais.map((estado) => (
              <option
                key={estado.idEstado}
                value={estado.NombreEstado}
                id={estado.idEstado}
              >
                {estado.NombreEstado}
              </option>
            ))}
          </select>
          {MensajeError("EstadoDestinatario")}
        </span>
      )}
      {ciudadesPorEstado && (
        <>
          <span className="RegistrarNuevoDestinatario__Campo">
            <p>
              <ion-icon name="locate"></ion-icon> Ciudad
            </p>
            <select
              name="CiudadDestinatario"
              id="CiudadDestinatario"
              {...register("CiudadDestinatario", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
              defaultValue={""}
            >
              <option value="" disabled>
                Selecciona una ciudad
              </option>
              {ciudadesPorEstado.map((ciudad) => (
                <option
                  key={ciudad.idCiudad}
                  value={ciudad.NombreCiudad}
                  id={ciudad.idCiudad}
                >
                  {ciudad.NombreCiudad}
                </option>
              ))}
            </select>
            {MensajeError("CiudadDestinatario")}
          </span>
          <span className="RegistrarNuevoDestinatario__Campo">
            <p>
              <ion-icon name="pin"></ion-icon> Código Postal
            </p>
            <input
              name="CodigoPostalDestinatario"
              id="CodigoPostalDestinatario"
              {...register("CodigoPostalDestinatario", {
                required: "¡Este campo es obligatorio! ⚠️",
                pattern: {
                  value: /^\d+$/,
                  message: "¡Este campo solo acepta números! 🔢",
                },
                maxLength: {
                  value: 5,
                  message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
                },
                minLength: {
                  value: 5,
                  message:
                    "¡Este campo no puede tener menos de 5 caracteres! 🔠",
                },
              })}
              placeholder="Escriba aquí..."
              onChange={(e) => {
                // PONEMOS 5 PORQUE ES EL MÍNIMO Y MAXIMO DE UN CP
                establecerCpColonia(
                  e.target.value.length === 5 ? e.target.value : null
                );
              }}
              minLength={5}
              maxLength={5}
            ></input>
            {MensajeError("CodigoPostalDestinatario")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP?.length > 0 ? (
          <span className="RegistrarNuevoDestinatario__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Colonia
            </p>
            <select
              name="DireccionDestinatario"
              id="DireccionDestinatario"
              {...register("DireccionDestinatario", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
              value={coloniaSeleccionada}
              onChange={(e) => establecerColoniaSeleccionada(e.target.value)}
            >
              {coloniasPorCP.map((colonia) => (
                <option
                  key={colonia.idColonia}
                  value={colonia.NombreColonia}
                  id={colonia.idColonia}
                >
                  {colonia.NombreColonia}
                </option>
              ))}
            </select>
            {MensajeError("DireccionDestinatario")}
          </span>
        ) : (
          <span className="RegistrarNuevoDestinatario__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Dirección
            </p>
            <input
              name="DireccionDestinatario"
              id="DireccionDestinatario"
              {...register("DireccionDestinatario", {
                required: "¡Este campo es obligatorio! ⚠️",
                maxLength: {
                  value: 1000,
                  message:
                    "¡Este campo no puede tener más de 1000 caracteres! 🔠",
                },
              })}
              placeholder="Escriba aquí..."
            ></input>
            {MensajeError("DireccionDestinatario")}
          </span>
        ))}
      <span className="RegistrarNuevoDestinatario__Campo">
        <p>
          <ion-icon name="navigate"></ion-icon> Municipio o delegación
        </p>
        <input
          name="MunicipioDelegacionDestinatario"
          id="MunicipioDelegacionDestinatario"
          placeholder="Escriba aquí..."
          {...register("MunicipioDelegacionDestinatario", {
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("MunicipioDelegacionDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatario__Campo Dos">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>

        <input
          id="ReferenciaDestinatario"
          type="text"
          name="ReferenciaDestinatario"
          placeholder="Escriba aquí..."
          {...register("ReferenciaDestinatario", {
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ReferenciaDestinatario")}
      </span>
      <footer className="RegistrarNuevoDestinatario__Footer">
        <button
          className="RegistrarNuevoDestinatario__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatario__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionada NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
