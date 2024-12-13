/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useRecolecciones } from "../../../context/RecoleccionesContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_FORMULARIO_RECOLECCIONES,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../componentes/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";
import {
  ESTILOS_INFO,
  ESTILOS_SUCCESS,
  ESTILOS_WARNING,
} from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Recolecciones/CrearRecoleccion/FormularioRecoleccion.css";

export default function FormularioRecoleccion({
  Idioma,
  recoleccion,
  establecerRecoleccion,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const [focusearInput, establecerFocusearInput] = useState(false);
  const [valorInput, establecerValorInput] = useState("");
  const { ObtenerInformacionDeGuia } = useRecolecciones();
  const { handleSubmit, register, reset } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    document.getElementById("GuiaPedido").focus();
  }, [focusearInput]);

  const BuscarInformacionDeGuiaParaReloccion = handleSubmit(async (info) => {
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
    // VERIFICAMOS QUE LA GUIA NO EXISTA EN LA RECOLECCION ACTUAL
    if (recoleccion.some((guia) => guia.GuiaPedido === valorInput)) {
      toast.error(`¡La guía ${valorInput} ya se encuentra en la recolección!`, {
        style: ESTILOS_WARNING,
      });
      return ReiniciarValores();
    }
    try {
      info.GuiaPedido = valorInput;
      const res = await ObtenerInformacionDeGuia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        toast.success(
          `¡La guía ${info.GuiaPedido} ha sido agregada con éxito a la recolección!`,
          {
            style: ESTILOS_SUCCESS,
          }
        );
        AgregarNuevaGuiaRecoleccion(res.data);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      ReiniciarValores();
    }
  });
  const AgregarNuevaGuiaRecoleccion = (infGuia) => {
    establecerRecoleccion([infGuia, ...recoleccion]);
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
      className="FormularioRecoleccion"
      onSubmit={BuscarInformacionDeGuiaParaReloccion}
    >
      <h1 className="FormularioRecoleccion__Titulo">
        {DICCIONARIO_FORMULARIO_RECOLECCIONES[Idioma].CrearRecoleccion}
      </h1>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="scan-circle"></ion-icon>{" "}
          {DICCIONARIO_FORMULARIO_RECOLECCIONES[Idioma].IngresaEscaneaGuia}
        </p>
        <input
          {...register("GuiaPedido")}
          id="GuiaPedido"
          type="text"
          name="GuiaPedido"
          autoComplete="off"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          onKeyUp={(e) => establecerValorInput(e.target.value.trim())}
        />
      </span>
      <GrupoDeBotonesInferior Idioma={Idioma} BotonBuscar={true} />
    </form>
  );
}
