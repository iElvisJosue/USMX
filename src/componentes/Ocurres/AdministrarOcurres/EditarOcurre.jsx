/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../../context/OcurreContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR (ESTILOS REUTILIZADOS)
import "../../../estilos/componentes/Ocurres/AdministrarOcurres/EditarOcurre.css";

export default function EditarOcurre({
  informacionDelOcurre,
  establecerVistaOcurres,
}) {
  const { ActualizarInformacionOcurre } = useOcurre();
  // ESTADOS PARA ALMACENAR LOS DATOS DE LA DIRECCIÓN
  const [codigoDelPaisSeleccionado, establecerCodigoDelPaisSeleccionado] =
    useState(informacionDelOcurre.CodigoPaisOcurre);
  const [paisSeleccionado, establecerPaisSeleccionado] = useState(null);

  const [idEstado, establecerIdEstado] = useState(null);
  const [cpColonia, establecerCpColonia] = useState(
    informacionDelOcurre.CodigoPostalOcurre
  );
  // ESTE ESTADO ES PARA NO MOSTRAR UN CAMPO EN BLANCO A LA HORA DE ITERAR
  // MUCHO CON LA COLONIA Y EL CP
  const [coloniaSeleccionada, establecerColoniaSeleccionada] = useState(
    informacionDelOcurre.DireccionOcurre
  );
  // ESTE ESTADO ES PARA CAMBIAR EL VALOR DE LA COLONIA POR DEFECTO DE LA BD
  const [cambiarValorDeLaColonia, establecerCambiarValorDeLaColonia] =
    useState(false);
  // ESTE ESTADO ES PARA CAMBIAR EL VALOR DE LA CIUDAD POR DEFECTO DE LA BD
  const [cambiarValorDeLaCiudad, establecerCambiarValorDeLaCiudad] =
    useState(false);

  const { paises } = useObtenerPaisesActivos();
  const { estadosPorCodigoDelPais } = useObtenerEstadosPorCodigoDelPais(
    codigoDelPaisSeleccionado
  );
  const { ciudadesPorEstado } = useObtenerCiudadesPorEstado(idEstado);
  const { coloniasPorCP } = useObtenerColoniasPorCP(
    cpColonia,
    paisSeleccionado
  );
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  // CAMBIAMOS LA COLONIA SELECCIONADA POR DEFECTO UNICAMENTE CUANDO SE CAMBIA EL CP
  useEffect(() => {
    if (coloniasPorCP?.length > 0 && cambiarValorDeLaColonia) {
      establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia);
    }
  }, [coloniasPorCP, cpColonia]);

  // ESTE USE EFFECT SE ENCARGA DE ESTABLECER EL ID DEL ESTADO
  // PERO PRIMERO NOS DEBEMOS ASEGURAR DE QUE LOS ESTADOS HAYAN CARGADO
  useEffect(() => {
    if (estadosPorCodigoDelPais) {
      const selectElement = document.getElementById("EstadoOcurre");
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      establecerIdEstado(selectedOption.id);
    }
  }, [estadosPorCodigoDelPais]);

  // ESTE USE EFFECT SE ENCARGA DE ESTABLECER LA CIUDAD SELECCIONADA POR DEFECTO
  // UNICAMENTE CUANDO SE INICIA EL COMPONENTE, POR ESO AGREGAMOS EL ESTADO DE cambiarValorDeLaCiudad
  useEffect(() => {
    if (ciudadesPorEstado && !cambiarValorDeLaCiudad) {
      setValue("CiudadOcurre", informacionDelOcurre.CiudadOcurre);
    }
  }, [ciudadesPorEstado]);

  useEffect(() => {
    setValue("NombreOcurre", informacionDelOcurre?.NombreOcurre);
    setValue(
      "OperadorLogisticoOcurre",
      informacionDelOcurre?.OperadorLogisticoOcurre
    );
    setValue("TelefonoOcurre", informacionDelOcurre?.TelefonoOcurre);
    setValue("CorreoOcurre", informacionDelOcurre?.CorreoOcurre);
    setValue("PaisOcurre", informacionDelOcurre?.PaisOcurre);
    setValue("EstadoOcurre", informacionDelOcurre?.EstadoOcurre);
    setValue("CodigoPostalOcurre", informacionDelOcurre?.CodigoPostalOcurre);
    setValue("DireccionOcurre", informacionDelOcurre?.DireccionOcurre);
    setValue(
      "MunicipioDelegacionOcurre",
      informacionDelOcurre?.MunicipioDelegacionOcurre
    );
    setValue("ReferenciaOcurre", informacionDelOcurre?.ReferenciaOcurre);
    setValue("ObservacionesOcurre", informacionDelOcurre?.ObservacionesOcurre);
    // ESTABLECEMOS EL NOMBRE DEL PAIS
    const { NombrePais } = DividirCodigoDelNombrePais(
      informacionDelOcurre?.PaisOcurre
    );
    establecerPaisSeleccionado(NombrePais);
  }, [informacionDelOcurre]);

  const GuardarInformacionDelOcurre = handleSubmit(async (info) => {
    try {
      const { CodigoPais } = DividirCodigoDelNombrePais(info.PaisOcurre);
      info.CodigoPaisOcurre = CodigoPais;
      info.idOcurre = informacionDelOcurre?.idOcurre;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionOcurre(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVistaOcurres(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });
  const EstablecerCodigoPais = (InfPais) => {
    ReiniciarValoresDeLasDirecciones();
    const { CodigoPais, NombrePais } = DividirCodigoDelNombrePais(InfPais);
    establecerPaisSeleccionado(NombrePais);
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
      EstadoOcurre: "",
      CiudadOcurre: "",
      CodigoPostalOcurre: "",
      DireccionOcurre: "",
    });

    establecerPaisSeleccionado(null);
    establecerCambiarValorDeLaCiudad(true);
    establecerCodigoDelPaisSeleccionado(null);
    establecerIdEstado(null);
    establecerCpColonia(null);
    establecerCambiarValorDeLaColonia(false);
  };

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

  return (
    <form className="EditarOcurre" onSubmit={GuardarInformacionDelOcurre}>
      <div className="EditarOcurre__Opciones">
        <button
          className="EditarOcurre__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVistaOcurres(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarOcurre__Titulo">Editar Ocurre</h1>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="alert-circle"></ion-icon> Nombre del ocurre
        </p>
        <input
          id="NombreOcurre"
          type="text"
          name="NombreOcurre"
          placeholder="Escriba aquí..."
          {...register("NombreOcurre", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("NombreOcurre")}
      </span>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="business"></ion-icon> Operador logístico
        </p>
        <select
          name="OperadorLogisticoOcurre"
          id="OperadorLogisticoOcurre"
          {...register("OperadorLogisticoOcurre")}
        >
          <option value="FedEx">FedEx</option>
          <option value="Estafeta">Estafeta</option>
          <option value="DHL">DHL</option>
          <option value="UPS">UPS</option>
          <option value="Paquetexpress">Paquetexpress</option>
          <option value="Redpack">Redpack</option>
          <option value="99 Minutos">99 Minutos</option>
        </select>
      </span>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono
        </p>
        <input
          id="TelefonoOcurre"
          type="text"
          name="TelefonoOcurre"
          placeholder="Escriba aquí..."
          {...register("TelefonoOcurre", {
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
        />
        {MensajeError("TelefonoOcurre")}
      </span>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="mail"></ion-icon> Correo electrónico
        </p>
        <input
          id="CorreoOcurre"
          type="text"
          name="CorreoOcurre"
          placeholder="Escriba aquí..."
          {...register("CorreoOcurre", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CorreoOcurre")}
      </span>
      {paises && (
        <span
          className="EditarOcurre__Campo"
          onChange={(e) => EstablecerCodigoPais(e.target.value)}
        >
          <p>
            <ion-icon name="flag"></ion-icon> País
          </p>
          <select
            name="PaisOcurre"
            id="PaisOcurre"
            {...register("PaisOcurre", {
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
          {MensajeError("PaisOcurre")}
        </span>
      )}
      {estadosPorCodigoDelPais && (
        <span className="EditarOcurre__Campo">
          <p>
            <ion-icon name="location"></ion-icon> Estado
          </p>
          <select
            name="EstadoOcurre"
            id="EstadoOcurre"
            {...register("EstadoOcurre", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
            defaultValue={""}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              establecerIdEstado(selectedOption.id);
              establecerCambiarValorDeLaCiudad(true);
              document.getElementById("CiudadOcurre").value = "";
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
          {MensajeError("EstadoOcurre")}
        </span>
      )}
      {ciudadesPorEstado && (
        <>
          <span className="EditarOcurre__Campo Dos">
            <p>
              <ion-icon name="locate"></ion-icon> Ciudad
            </p>
            <select
              name="CiudadOcurre"
              id="CiudadOcurre"
              {...register("CiudadOcurre", {
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
            {MensajeError("CiudadOcurre")}
          </span>
          <span className="EditarOcurre__Campo">
            <p>
              <ion-icon name="pin"></ion-icon> Código Postal
            </p>
            <input
              name="CodigoPostalOcurre"
              id="CodigoPostalOcurre"
              {...register("CodigoPostalOcurre", {
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
                establecerCpColonia(e.target.value);
                establecerCambiarValorDeLaColonia(true);
              }}
              maxLength={5}
            ></input>
            {MensajeError("CodigoPostalOcurre")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP?.length > 0 ? (
          <span className="EditarOcurre__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Colonia
            </p>
            <select
              name="DireccionOcurre"
              id="DireccionOcurre"
              {...register("DireccionOcurre", {
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
            {MensajeError("DireccionOcurre")}
          </span>
        ) : (
          <span className="EditarOcurre__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Dirección
            </p>
            <input
              name="DireccionOcurre"
              id="DireccionOcurre"
              {...register("DireccionOcurre", {
                required: "¡Este campo es obligatorio! ⚠️",
                maxLength: {
                  value: 1000,
                  message:
                    "¡Este campo no puede tener más de 1000 caracteres! 🔠",
                },
              })}
              placeholder="Escriba aquí..."
            ></input>
            {MensajeError("DireccionOcurre")}
          </span>
        ))}
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="navigate"></ion-icon> Municipio o delegación
        </p>
        <input
          name="MunicipioDelegacionOcurre"
          id="MunicipioDelegacionOcurre"
          placeholder="Escriba aquí..."
          {...register("MunicipioDelegacionOcurre", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("MunicipioDelegacionOcurre")}
      </span>
      <span className="EditarOcurre__Campo Tres">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          name="ReferenciaOcurre"
          id="ReferenciaOcurre"
          placeholder="Escriba aquí..."
          {...register("ReferenciaOcurre", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ReferenciaOcurre")}
      </span>
      <span className="EditarOcurre__Campo Tres">
        <p>
          <ion-icon name="search"></ion-icon> Observaciones
        </p>
        <input
          name="ObservacionesOcurre"
          id="ObservacionesOcurre"
          placeholder="Escriba aquí..."
          {...register("ObservacionesOcurre", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ObservacionesOcurre")}
      </span>
      <footer className="EditarOcurre__Footer">
        <button type="submit" className="EditarOcurre__Footer__Boton Siguiente">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
