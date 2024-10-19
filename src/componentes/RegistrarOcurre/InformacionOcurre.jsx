// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../context/OcurreContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/Ocurre/InformacionOcurre.css";

export default function InformacionOcurre() {
  const { RegistrarOcurre } = useOcurre();
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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (coloniasPorCP?.length > 0) {
      establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia); // Selecciona la primera colonia
    }
  }, [coloniasPorCP]);

  const GuardarInformacionDelOcurre = handleSubmit(async (info) => {
    try {
      const { CodigoPais } = DividirCodigoDelNombrePais(info.PaisOcurre);
      info.CodigoPaisOcurre = CodigoPais;
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
      EstadoOcurre: "",
      CiudadOcurre: "",
      CodigoPostalOcurre: "",
      DireccionOcurre: "",
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
      <span className="InformacionOcurre__Campo">
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
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("NombreOcurre")}
      </span>
      <span className="InformacionOcurre__Campo">
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
      <span className="InformacionOcurre__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono
        </p>
        <input
          id="TelefonoOcurre"
          type="text"
          name="TelefonoOcurre"
          placeholder="Escriba aquí..."
          {...register("TelefonoOcurre", {
            pattern: {
              value: /^\d+$/,
              message: "¡Este campo solo acepta números! 🔢",
            },
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
      <span className="InformacionOcurre__Campo">
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
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "¡Formato de correo no valido! ⚠️",
            },
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
          className="InformacionOcurre__Campo"
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
        <span className="InformacionOcurre__Campo">
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
          <span className="InformacionOcurre__Campo Dos">
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
          <span className="InformacionOcurre__Campo">
            <p>
              <ion-icon name="pin"></ion-icon> Código Postal
            </p>
            <input
              name="CodigoPostalOcurre"
              id="CodigoPostalOcurre"
              {...register("CodigoPostalOcurre", {
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
            {MensajeError("CodigoPostalOcurre")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP?.length > 0 ? (
          <span className="InformacionOcurre__Campo Dos">
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
          <span className="InformacionOcurre__Campo Dos">
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
      <span className="RegistrarNuevoDestinatario__Campo">
        <p>
          <ion-icon name="navigate"></ion-icon> Municipio o delegación
        </p>
        <input
          name="MunicipioDelegacionOcurre"
          id="MunicipioDelegacionOcurre"
          placeholder="Escriba aquí..."
          {...register("MunicipioDelegacionOcurre", {
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("MunicipioDelegacionOcurre")}
      </span>
      <span className="RegistrarNuevoDestinatario__Campo Tres">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          name="ReferenciaOcurre"
          id="ReferenciaOcurre"
          placeholder="Escriba aquí..."
          {...register("ReferenciaOcurre", {
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ReferenciaOcurre")}
      </span>
      <span className="RegistrarNuevoDestinatario__Campo Tres">
        <p>
          <ion-icon name="search"></ion-icon> Observaciones
        </p>
        <input
          name="ObservacionesOcurre"
          id="ObservacionesOcurre"
          placeholder="Escriba aquí..."
          {...register("ObservacionesOcurre", {
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ObservacionesOcurre")}
      </span>
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
