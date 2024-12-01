/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../../context/BodegaContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_FORMULARIO_BUSQUEDA_ENTRADAS,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../../helpers/ObtenerCookie";
import { MensajePeticionPendiente } from "../../../../helpers/FuncionesGenerales";
import {
  ESTILOS_INFO,
  ESTILOS_SUCCESS,
  ESTILOS_WARNING,
} from "../../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/EntradasBodega/CrearEntrada/FormularioBusquedaEntradas.css";

export default function FormularioBusquedaEntradas({
  idioma,
  informacionDeLaEntrada,
  entrada,
  establecerEntrada,
  establecerVista,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [focusearInput, establecerFocusearInput] = useState(false);
  const [valorInput, establecerValorInput] = useState("");
  const { ObtenerInformacionDeGuiaParaEntradas } = useBodega();
  const { handleSubmit, register, reset } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    document.getElementById("GuiaPedido").focus();
  }, [focusearInput]);

  const BuscarInformacionDeGuiaParaLasEntradas = handleSubmit(async (info) => {
    // SI NO HAY UNA GUIA, NO PERMITIMOS LA BUSQUEDA
    if (!valorInput) {
      toast.error("¡Por favor ingresa una guía!", {
        style: ESTILOS_INFO,
      });
      establecerFocusearInput(!focusearInput);
      return;
    }
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    // VERIFICAMOS QUE LA GUIA NO EXISTA EN LA ENTRADA ACTUAL
    if (entrada.some((guia) => guia.GuiaPedido === valorInput)) {
      toast.error(`¡La guía ${valorInput} ya se encuentra en la entrada!`, {
        style: ESTILOS_WARNING,
      });
      return ReiniciarValores();
    }
    try {
      info.idMovimientoEntrada = informacionDeLaEntrada.idMovimientoEntrada;
      info.GuiaPedido = valorInput;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ObtenerInformacionDeGuiaParaEntradas(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        toast.success(
          `¡La guía ${info.GuiaPedido} ha sido agregada con éxito a la entrada!`,
          {
            style: ESTILOS_SUCCESS,
          }
        );
        AgregarNuevaGuiaEntrada(res.data);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      ReiniciarValores();
    }
  });
  const AgregarNuevaGuiaEntrada = (infGuia) => {
    establecerEntrada([infGuia, ...entrada]);
    ReiniciarValores();
  };
  const ReiniciarValores = () => {
    reset();
    establecerPeticionPendiente(false);
    establecerFocusearInput(!focusearInput);
    establecerValorInput("");
  };
  return (
    <form
      className="FormularioBusquedaEntradas"
      onSubmit={BuscarInformacionDeGuiaParaLasEntradas}
    >
      <section className="FormularioBusquedaEntradas__Opciones">
        <button
          className="FormularioBusquedaEntradas__Opciones--Boton"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <h1 className="FormularioBusquedaEntradas__Titulo">
        {DICCIONARIO_FORMULARIO_BUSQUEDA_ENTRADAS[idioma].CrearEntrada}
      </h1>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="scan-circle"></ion-icon>{" "}
          {DICCIONARIO_FORMULARIO_BUSQUEDA_ENTRADAS[idioma].IngresaEscaneaGuia}
        </p>
        <input
          {...register("GuiaPedido")}
          id="GuiaPedido"
          type="text"
          name="GuiaPedido"
          autoComplete="off"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          onKeyUp={(e) => establecerValorInput(e.target.value.trim())}
        />
      </span>
      <GrupoDeBotonesInferior idioma={idioma} BotonBuscar={true} />
    </form>
  );
}
