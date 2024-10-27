/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_SUCCESS } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/RegistrarNuevoDestinatarioPedido.css";

export default function RegistrarNuevoDestinatarioPedido({
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
    toast.success("¡Paso 2 (Destinatario) completado con éxito!", {
      style: ESTILOS_SUCCESS,
    });
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
      className="RegistrarNuevoDestinatarioPedido"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      <span className="RegistrarNuevoDestinatarioPedido__Opciones">
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedido__Opciones--Boton Lista"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedido__Opciones--Boton Ocurre"
          onClick={() => establecerVistaDestinatario(2)}
        >
          <ion-icon name="alert-circle"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoDestinatarioPedido__Titulo">
        Registrar nuevo destinatario
      </h1>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Nombre
        </p>
        <input
          name="NombreDestinatario"
          id="NombreDestinatario"
          placeholder="Escriba aquí..."
          {...register("NombreDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("NombreDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="man"></ion-icon> Apellido paterno
        </p>
        <input
          name="ApellidoPaternoDestinatario"
          id="ApellidoPaternoDestinatario"
          placeholder="Escriba aquí..."
          {...register("ApellidoPaternoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ApellidoPaternoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="woman"></ion-icon> Apellido materno
        </p>
        <input
          name="ApellidoMaternoDestinatario"
          id="ApellidoMaternoDestinatario"
          placeholder="Escriba aquí..."
          {...register("ApellidoMaternoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ApellidoMaternoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono casa
        </p>
        <input
          name="TelefonoCasaDestinatario"
          id="TelefonoCasaDestinatario"
          placeholder="Escriba aquí..."
          {...register("TelefonoCasaDestinatario", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("TelefonoCasaDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="phone-portrait"></ion-icon> Celular
        </p>
        <input
          name="CelularDestinatario"
          id="CelularDestinatario"
          placeholder="Escriba aquí..."
          {...register("CelularDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("CelularDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="mail"></ion-icon> Correo electrónico
        </p>
        <input
          name="CorreoDestinatario"
          id="CorreoDestinatario"
          placeholder="Escriba aquí..."
          {...register("CorreoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("CorreoDestinatario")}
      </span>
      {paises && (
        <span
          className="RegistrarNuevoDestinatarioPedido__Campo"
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
        <span className="RegistrarNuevoDestinatarioPedido__Campo">
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
          <span className="RegistrarNuevoDestinatarioPedido__Campo">
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
          <span className="RegistrarNuevoDestinatarioPedido__Campo">
            <p>
              <ion-icon name="pin"></ion-icon> Código Postal
            </p>
            <input
              name="CodigoPostalDestinatario"
              id="CodigoPostalDestinatario"
              {...register("CodigoPostalDestinatario", {
                required: "¡Este campo es obligatorio! ⚠️",
                pattern: REGEX_SOLO_NUMEROS,
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
            ></input>
            {MensajeError("CodigoPostalDestinatario")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP?.length > 0 ? (
          <span className="RegistrarNuevoDestinatarioPedido__Campo Dos">
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
          <span className="RegistrarNuevoDestinatarioPedido__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Dirección
            </p>
            <input
              name="DireccionDestinatario"
              id="DireccionDestinatario"
              {...register("DireccionDestinatario", {
                required: "¡Este campo es obligatorio! ⚠️",
                pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
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
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="navigate"></ion-icon> Municipio o delegación
        </p>
        <input
          name="MunicipioDelegacionDestinatario"
          id="MunicipioDelegacionDestinatario"
          placeholder="Escriba aquí..."
          {...register("MunicipioDelegacionDestinatario", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("MunicipioDelegacionDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo Dos">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>

        <input
          id="ReferenciaDestinatario"
          type="text"
          name="ReferenciaDestinatario"
          placeholder="Escriba aquí..."
          {...register("ReferenciaDestinatario", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ReferenciaDestinatario")}
      </span>
      <footer className="RegistrarNuevoDestinatarioPedido__Footer">
        <button
          className="RegistrarNuevoDestinatarioPedido__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatarioPedido__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionadaPedido NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
