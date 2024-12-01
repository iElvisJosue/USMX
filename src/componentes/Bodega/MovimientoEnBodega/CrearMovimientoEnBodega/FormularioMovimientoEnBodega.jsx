/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useBodega } from "../../../../context/BodegaContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_FORMULARIO_MOVIMIENTOS,
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
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/CrearMovimientoEnBodega/FormularioMovimientoEnBodega.css";

export default function FormularioMovimientoEnBodega({
  idioma,
  movimiento,
  establecerMovimiento,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [focusearInput, establecerFocusearInput] = useState(false);
  const [valorInput, establecerValorInput] = useState("");
  const { ObtenerInformacionDeGuiaParaMovimientoEnBodega } = useBodega();
  const { handleSubmit, register, reset } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    document.getElementById("GuiaPedido").focus();
  }, [focusearInput]);

  const BuscarInformacionDeGuiaParaMovimiento = handleSubmit(async (info) => {
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
    // VERIFICAMOS QUE LA GUIA NO EXISTA EN EL MOVIMIENTO ACTUAL
    if (movimiento.some((guia) => guia.GuiaPedido === valorInput)) {
      toast.error(`¡La guía ${valorInput} ya se encuentra en el movimiento!`, {
        style: ESTILOS_WARNING,
      });
      return ReiniciarValores();
    }
    try {
      info.GuiaPedido = valorInput;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ObtenerInformacionDeGuiaParaMovimientoEnBodega(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        toast.success(
          `¡La guía ${info.GuiaPedido} ha sido agregada con éxito al movimiento!`,
          {
            style: ESTILOS_SUCCESS,
          }
        );
        AgregarNuevaGuiaMovimiento(res.data);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      ReiniciarValores();
    }
  });
  const AgregarNuevaGuiaMovimiento = (infGuia) => {
    establecerMovimiento([infGuia, ...movimiento]);
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
      className="FormularioMovimientoEnBodega"
      onSubmit={BuscarInformacionDeGuiaParaMovimiento}
    >
      <h1 className="FormularioMovimientoEnBodega__Titulo">
        {DICCIONARIO_FORMULARIO_MOVIMIENTOS[idioma].CrearMovimiento}
      </h1>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="scan-circle"></ion-icon>{" "}
          {DICCIONARIO_FORMULARIO_MOVIMIENTOS[idioma].IngresaEscaneaGuia}
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
