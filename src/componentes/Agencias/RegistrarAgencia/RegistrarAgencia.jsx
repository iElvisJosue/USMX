// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";
import { useConfiguracion } from "../../../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/RegistrarAgencia/RegistrarAgencia.css";

export default function RegistrarAgencia() {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
  const { RegistrarAgencia } = useAgencias();
  const { idioma } = useConfiguracion();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDeLaAgencia = handleSubmit(async (info) => {
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para registrar la agencia, debe seleccionar una dirección!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    try {
      info.PaisAgencia = detallesDeLaDireccion.PAIS;
      info.CodigoPaisAgencia = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoAgencia = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoAgencia = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadAgencia = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalAgencia = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionAgencia = detallesDeLaDireccion.DIRECCION;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        reset();
        establecerDireccion(null);
        establecerDetallesDeLaDireccion(null);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["us", "mx"],
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarAgencia__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };
  const ReiniciarFormulario = () => {
    reset();
  };
  return (
    <div className="RegistrarAgencia">
      <form
        className="RegistrarAgencia__InformacionDeLaAgencia"
        onSubmit={GuardaInformacionDeLaAgencia}
      >
        <h1 className="RegistrarAgencia__InformacionDeLaAgencia__Titulo">
          {ListaDeIdiomas.VistaRegistrarAgencia[idioma].RegistrarAgencia}
        </h1>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="business"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].NombreDeLaAgencia}
          </p>
          <input
            id="NombreAgencia"
            name="NombreAgencia"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            tabIndex={-1}
            {...register("NombreAgencia", {
              required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("NombreAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="briefcase"></ion-icon>
            {
              ListaDeIdiomas.VistaRegistrarAgencia[idioma]
                .NombreLegalDeLaAgencia
            }
          </p>
          <input
            id="NombreLegalAgencia"
            name="NombreLegalAgencia"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("NombreLegalAgencia", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("NombreLegalAgencia")}
        </span>
        <GoogleAPI {...PropsGoogleAPI} />
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="call"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].TelAgencia}
          </p>
          <input
            id="TelefonoAgencia"
            name="TelefonoAgencia"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("TelefonoAgencia", {
              required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
              },
            })}
          ></input>
          {MensajeError("TelefonoAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="print"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].Fax}
          </p>
          <input
            id="FaxAgencia"
            name="FaxAgencia"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("FaxAgencia", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
              },
            })}
          ></input>
          {MensajeError("FaxAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="mail"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].CorreoAgencia}
          </p>
          <input
            id="CorreoAgencia"
            name="CorreoAgencia"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("CorreoAgencia", {
              required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("CorreoAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="mail"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].CorreoAgencia2}
          </p>
          <input
            id="CorreoAgenciaSecundario"
            name="CorreoAgenciaSecundario"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("CorreoAgenciaSecundario", {
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("CorreoAgenciaSecundario")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon>
            {
              ListaDeIdiomas.VistaRegistrarAgencia[idioma]
                .NombreRepresentanteVentas
            }
          </p>
          <input
            id="RepresentanteVentas"
            name="RepresentanteVentas"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("RepresentanteVentas", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("RepresentanteVentas")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="call"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].TelRepresentante}
          </p>
          <input
            id="TelefonoRepresentanteVentas"
            name="TelefonoRepresentanteVentas"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("TelefonoRepresentanteVentas", {
              required: ListaDeIdiomas.MensajesDeError[idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
              },
            })}
          ></input>
          {MensajeError("TelefonoRepresentanteVentas")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].NombreDelDueño}
          </p>
          <input
            id="NombreDueno"
            name="NombreDueno"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("NombreDueno", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("NombreDueno")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="call"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].TelDueño}
          </p>
          <input
            id="TelefonoDueno"
            name="TelefonoDueno"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("TelefonoDueno", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
              },
            })}
          ></input>
          {MensajeError("TelefonoDueno")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].NombreDelManager}
          </p>
          <input
            id="NombreManager"
            name="NombreManager"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("NombreManager", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("NombreManager")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="call"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].TelManager}
          </p>
          <input
            id="TelefonoManager"
            name="TelefonoManager"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("TelefonoManager", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Max10,
              },
              minLength: {
                value: 10,
                message: ListaDeIdiomas.MensajesDeError[idioma].Min10,
              },
            })}
          ></input>
          {MensajeError("TelefonoManager")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="reader"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].NoLicencia}
          </p>
          <input
            id="NumeroLicenciaAgencia"
            name="NumeroLicenciaAgencia"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("NumeroLicenciaAgencia", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          ></input>
          {MensajeError("NumeroLicenciaAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="reader"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].NoSalesTax}
          </p>
          <input
            id="NumeroImpuestosVenta"
            name="NumeroImpuestosVenta"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("NumeroImpuestosVenta", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          ></input>
          {MensajeError("NumeroImpuestosVenta")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="reader"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].SS}
          </p>
          <input
            id="SS"
            name="SS"
            placeholder={ListaDeIdiomas.Placeholder[idioma]}
            {...register("SS", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          ></input>
          {MensajeError("SS")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="copy"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].CopiaID}
          </p>
          <select name="CopiaID" id="CopiaID" {...register("CopiaID")}>
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          {MensajeError("CopiaID")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="copy"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].CopiaLicencia}
          </p>
          <select
            name="CopiaLicenciaNegocio"
            id="CopiaLicenciaNegocio"
            {...register("CopiaLicenciaNegocio")}
          >
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          {MensajeError("CopiaLicenciaNegocio")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="copy"></ion-icon>
            {ListaDeIdiomas.VistaRegistrarAgencia[idioma].CopiaSalesTax}
          </p>
          <select
            name="CopiaImpuestosVenta"
            id="CopiaImpuestosVenta"
            {...register("CopiaImpuestosVenta")}
          >
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          {MensajeError("CopiaImpuestosVenta")}
        </span>
        <footer className="RegistrarAgencia__InformacionDeLaAgencia__Footer">
          <button
            type="button"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            {ListaDeIdiomas.Botones[idioma].Cancelar}
          </button>
          <button
            type="submit"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Guardar"
          >
            {ListaDeIdiomas.Botones[idioma].Guardar}
          </button>
        </footer>
      </form>
    </div>
  );
}
