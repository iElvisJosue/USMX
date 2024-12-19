/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../../context/SistemaContext";
import { usePedidos } from "../../../context/PedidosContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_INFORMACION_DEL_PEDIDO,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerProductosPorAgencia from "../../../hooks/Pedidos/useObtenerProductosPorAgencia";
import useObtenerTiposDeCarga from "../../../hooks/Operaciones/Cargas/useObtenerTiposDeCarga";
import useObtenerTiposDeEnvio from "../../../hooks/Operaciones/Envios/useObtenerTiposDeEnvio";

// IMPORTAMOS LAS AYUDAS A USAR
import {
  CalcularCostoSobrePeso,
  CalcularCostoDelEnvio,
  CalcularCostoSeguro,
  CalcularTotalPedido,
  CalcularTotalProducto,
  CalcularIdUnico,
} from "../../../helpers/Calculos";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../../helpers/Regexs";
import {
  ESTILOS_WARNING,
  ESTILOS_SUCCESS,
} from "../../../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/InformacionDelPedido.css";

export default function InformacionDelPedido({
  Idioma,
  agencia,
  remitente,
  destinatario,
  paso,
  establecerPaso,
  pedido,
  establecerPedido,
  establecerDetallesPedido,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  // OBTENEMOS LOS PRODUCTOS, TIPOS DE CARGA Y TIPOS DE ENVIO
  const { productos } = useObtenerProductosPorAgencia(agencia.idAgencia);
  const { cargas, cargandoCargas } = useObtenerTiposDeCarga();
  const { envios } = useObtenerTiposDeEnvio();

  // CREAMOS EL ESTADO DONDE ALMACENAREMOS EL PORCENTAJE DE LA CARGA
  const [porcentajeCarga, establecerPorcentajeCarga] = useState(0);
  // ALMACENAMOS LA INFORMACIÓN DEL PRODUCTO SELECCIONADO
  const [productoSeleccionado, establecerProductoSeleccionado] = useState(null);

  useEffect(() => {
    if (!cargandoCargas) {
      // LO ESTABLECEMOS CON EL ELEMENTO 0 PORQUE ES EL PORCENTAJE DE CARGA POR DEFECTO
      establecerPorcentajeCarga(cargas[0].PorcentajeCarga);
    }
  }, [cargandoCargas]);

  // OBTENEMOS LA INFORMACIÓN DEL USUARIO
  const { infUsuario } = useSistema();
  // OBTENEMOS LA FUNCIÓN PARA GUARDAR TODA LA INFORMACIÓN
  const { GuardarTodaLaInformacion } = usePedidos();

  // OBTENEMOS LOS CAMPOS DEL PEDIDO
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardarInformacionDelProducto = handleSubmit(async (data) => {
    const {
      ValorDeclarado,
      ValorAsegurado,
      Peso,
      Largo,
      Ancho,
      Alto,
      Producto,
      TipoDeCarga,
      TipoDeEnvio,
    } = data;
    if (
      Producto === "Invalido" ||
      TipoDeCarga === "Invalido" ||
      TipoDeEnvio === "Invalido"
    ) {
      return toast.error(
        "¡Oops! Te olvidaste de seleccionar el producto, el tipo de carga o el tipo de envío.",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    if (Number(ValorAsegurado) > Number(ValorDeclarado)) {
      return toast.error(
        "¡El valor asegurado no puede ser mayor al valor declarado!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    if (Number(ValorAsegurado) > 500) {
      return toast.error("¡El valor asegurado no puede ser mayor a $500.00!", {
        style: ESTILOS_WARNING,
      });
    }
    if (Number(Peso) > Number(productoSeleccionado.PesoMaximoProducto)) {
      return toast.error(
        `¡El peso no puede ser mayor a ${productoSeleccionado.PesoMaximoProducto}!`,
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    const cantidadDeProductos = Number(data.Cantidad);
    const nuevoPedido = [...pedido]; // Crear una copia del pedido actual
    for (let i = 1; i <= cantidadDeProductos; i++) {
      const nuevoProducto = {
        ...data, // Copia del objeto data
        UsuarioResponsable: infUsuario?.Usuario,
        idProducto: CalcularIdUnico(), // Usar nuevoPedido para mantener el id correcto
        CostoEnvio: CalcularCostoDelEnvio(
          Number(data.Peso),
          Number(data.ValorDeclarado),
          Number(productoSeleccionado.PesoSinCobroProducto),
          Number(productoSeleccionado.LibraExtraProducto)
        ),
        CostoSeguro: CalcularCostoSeguro(
          Number(data.ValorAsegurado),
          porcentajeCarga
        ),
        CostoSobrePeso: CalcularCostoSobrePeso(
          Number(data.Peso),
          Number(productoSeleccionado.PesoSinCobroProducto),
          Number(productoSeleccionado.LibraExtraProducto)
        ),
        PieCubico: ((Largo * Ancho * Alto) / 1728).toString().slice(0, 6),
        Total: CalcularTotalProducto(
          CalcularCostoSobrePeso(
            Number(data.Peso),
            Number(productoSeleccionado.PesoSinCobroProducto),
            Number(productoSeleccionado.LibraExtraProducto)
          ),
          CalcularCostoSeguro(Number(data.ValorAsegurado), porcentajeCarga),
          CalcularCostoDelEnvio(
            Number(data.Peso),
            Number(data.ValorDeclarado),
            Number(productoSeleccionado.PesoSinCobroProducto),
            Number(productoSeleccionado.LibraExtraProducto)
          )
        ),
      };
      nuevoPedido.push(nuevoProducto); // Añadir el nuevo producto al pedido
    }
    establecerPedido(nuevoPedido); // Actualizar el pedido fuera del bucle
    toast.success(
      `¡El producto ${Producto.toUpperCase()} ha sido agregado con éxito al pedido!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
    reset();
    // LO ESTABLECEMOS CON EL ELEMENTO 0 PORQUE ES EL PORCENTAJE DE CARGA POR DEFECTO
    // Y AL HACER EL RESET, SE RESETEA EL PORCENTAJE DE CARGA POR DEFECTO
    establecerPorcentajeCarga(cargas[0].PorcentajeCarga);
  });

  const EliminarProductoDelPedido = (Producto, id) => {
    toast.success(
      `¡El producto ${Producto.toUpperCase()} ha sido eliminado con éxito del pedido!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
    const nuevoPedido = pedido.filter((item) => item.idProducto !== id);
    establecerPedido(nuevoPedido);
  };

  const ObtenerInformacionDelProductoSeleccionado = (event) => {
    const idDelProductoSeleccionado = Number(
      event.target.selectedOptions[0].getAttribute("id")
    );
    const informacionProductoSeleccionado = productos.filter(
      (producto) => producto.idProducto === idDelProductoSeleccionado
    );

    EstablecerCamposSoloLectura(informacionProductoSeleccionado);
    setValue("Ancho", informacionProductoSeleccionado[0].AnchoProducto);
    setValue("Largo", informacionProductoSeleccionado[0].LargoProducto);
    setValue("Alto", informacionProductoSeleccionado[0].AltoProducto);
    setValue(
      "ValorDeclarado",
      informacionProductoSeleccionado[0].PrecioProducto
    );

    establecerProductoSeleccionado(informacionProductoSeleccionado[0]);
  };

  const EstablecerCamposSoloLectura = (informacion) => {
    if (informacion[0].AnchoProducto) {
      document
        .getElementById("Ancho")
        .classList.add("InformacionDelPedido__Campo", "Lectura");
    } else {
      document
        .getElementById("Ancho")
        .classList.remove("InformacionDelPedido__Campo", "Lectura");
    }
    if (informacion[0].LargoProducto) {
      document
        .getElementById("Largo")
        .classList.add("InformacionDelPedido__Campo", "Lectura");
    } else {
      document
        .getElementById("Largo")
        .classList.remove("InformacionDelPedido__Campo", "Lectura");
    }
    if (informacion[0].AltoProducto) {
      document
        .getElementById("Alto")
        .classList.add("InformacionDelPedido__Campo", "Lectura");
    } else {
      document
        .getElementById("Alto")
        .classList.remove("InformacionDelPedido__Campo", "Lectura");
    }
  };

  const ObtenerPorcentajeDeCarga = (event) => {
    // OBTENEMOS EL ID DEL ELEMENTO SELECT SELECCIONADO
    const idDelTipoDeCarga = event.target.selectedOptions[0].getAttribute("id");

    // OBTENEMOS EL PORCENTAJE DE CARGA CORRESPONDIENTE
    const PorcentajeDeCargaSelecciona = cargas.filter(
      ({ idCarga }) => idCarga === Number(idDelTipoDeCarga)
    );

    // ACTUALIZAMOS EL PORCENTAJE DE CARGA
    establecerPorcentajeCarga(PorcentajeDeCargaSelecciona[0].PorcentajeCarga);
  };

  const GuardarTodaLaInformacionEnLaBD = async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    const TodaLaInformacion = {
      remitente,
      destinatario,
      idUsuario: infUsuario.idUsuario,
      NombreUsuario: infUsuario.Usuario,
      idAgencia: agencia.idAgencia,
      NombreAgencia: agencia.NombreAgencia,
      pedido,
    };
    establecerPeticionPendiente(true);
    try {
      const res = await GuardarTodaLaInformacion(TodaLaInformacion);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        toast.success("¡El pedido ha sido creado con éxito!", {
          style: ESTILOS_SUCCESS,
        });
        establecerDetallesPedido(res.data);
        establecerPaso(4);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  };

  const MensajeDeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
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
    <>
      <form
        className="InformacionDelPedido"
        onSubmit={GuardarInformacionDelProducto}
      >
        <h1 className="InformacionDelPedido__Titulo">
          {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].InformacionDelPedido}
        </h1>
        <span
          className="InformacionDelPedido__Campo"
          onChange={ObtenerInformacionDelProductoSeleccionado}
        >
          <p>
            <ion-icon name="basket"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Producto}
          </p>
          <select
            name="Producto"
            id="Producto"
            {...register("Producto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            })}
          >
            <option value="Invalido">
              {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].SeleccionaUnProducto}
            </option>
            {productos.map((producto) => (
              <option
                key={producto.idProducto}
                value={producto.NombreProducto}
                id={producto.idProducto}
              >
                {producto.NombreProducto}
              </option>
            ))}
          </select>
          {MensajeDeError("Producto")}
        </span>
        <span className="InformacionDelPedido__Campo">
          <p>
            <ion-icon name="apps"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Cantidad}
          </p>
          <input
            id="Cantidad"
            type="text"
            name="Cantidad"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Cantidad", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          />
          {MensajeDeError("Cantidad")}
        </span>
        <span
          className="InformacionDelPedido__Campo"
          onChange={ObtenerPorcentajeDeCarga}
        >
          <p>
            <ion-icon name="cube"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].TipoDeCarga}
          </p>
          <select
            name="TipoDeCarga"
            id="TipoDeCarga"
            {...register("TipoDeCarga", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            })}
          >
            <option value="Invalido">
              {
                DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma]
                  .SeleccionaUnTipoDeCarga
              }
            </option>
            {cargas?.map((carga) => (
              <option
                key={carga.idCarga}
                value={carga.TipoCarga}
                id={carga.idCarga}
              >
                {carga.TipoCarga}
              </option>
            ))}
          </select>
          {MensajeDeError("TipoDeCarga")}
        </span>
        <span className="InformacionDelPedido__Campo">
          <p>
            <ion-icon name="airplane"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].TipoDeEnvio}
          </p>
          <select
            name="TipoDeEnvio"
            id="TipoDeEnvio"
            {...register("TipoDeEnvio", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            })}
          >
            <option value="Invalido">
              {
                DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma]
                  .SeleccionaUnTipoDeEnvio
              }
            </option>
            {envios?.map((envio) => (
              <option
                key={envio.idTipoEnvio}
                value={envio.TipoEnvio}
                id={envio.idTipoEnvio}
              >
                {envio.TipoEnvio}
              </option>
            ))}
          </select>
          {MensajeDeError("TipoDeEnvio")}
        </span>
        <span className="InformacionDelPedido__Campo Individual">
          <p>
            <ion-icon name="scale"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Peso}
          </p>
          <input
            id="Peso"
            type="text"
            name="Peso"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Peso", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          />
          {MensajeDeError("Peso")}
        </span>
        <span className="InformacionDelPedido__Campo Individual">
          <p>
            <ion-icon name="swap-horizontal"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Ancho}
          </p>
          <input
            id="Ancho"
            type="text"
            name="Ancho"
            tabIndex="-1"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Ancho", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          />
          {MensajeDeError("Ancho")}
        </span>
        <span className="InformacionDelPedido__Campo Individual">
          <p>
            <ion-icon name="swap-vertical"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Largo}
          </p>
          <input
            id="Largo"
            type="text"
            name="Largo"
            tabIndex="-1"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Largo", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          />
          {MensajeDeError("Largo")}
        </span>
        <span className="InformacionDelPedido__Campo Individual">
          <p>
            <ion-icon name="arrow-up"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Alto}
          </p>
          <input
            id="Alto"
            type="text"
            name="Alto"
            tabIndex="-1"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("Alto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          />
          {MensajeDeError("Alto")}
        </span>
        <span className="InformacionDelPedido__Campo Completo">
          <p>
            <ion-icon name="document-text"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].ContenidoDelEnvio}
          </p>
          <input
            id="ContenidoDeEnvio"
            type="text"
            name="ContenidoDeEnvio"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("ContenidoDeEnvio", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 1000,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max1000,
              },
            })}
          />
          {MensajeDeError("ContenidoDeEnvio")}
        </span>
        <span className="InformacionDelPedido__Campo Individual">
          <p>
            <ion-icon name="cash"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].ValorDeclarado}
          </p>
          <input
            id="ValorDeclarado"
            type="text"
            name="ValorDeclarado"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("ValorDeclarado", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
              },
            })}
          />
          {MensajeDeError("ValorDeclarado")}
        </span>
        <span className="InformacionDelPedido__Campo Individual">
          <p>
            <ion-icon name="shield-checkmark"></ion-icon>{" "}
            {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].ValorAsegurado}
          </p>
          <input
            id="ValorAsegurado"
            type="text"
            name="ValorAsegurado"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("ValorAsegurado", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
              },
            })}
          />
          {MensajeDeError("ValorAsegurado")}
        </span>
        <div className="InformacionDelPedido__BotonPedido">
          <button>{DICCIONARIO_BOTONES[Idioma].AgregarProducto}</button>
        </div>
        <AgenciaSeleccionadaPedido
          Idioma={Idioma}
          NombreAgencia={agencia?.NombreAgencia}
        />
      </form>
      {pedido.length > 0 && (
        <section className="InformacionDelPedido__ListaProductos">
          <span className="InformacionDelPedido__ListaProductos__Titulo">
            <p className="InformacionDelPedido__ListaProductos__Titulo__Texto">
              <ion-icon name="cube"></ion-icon>
              {
                DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].ProductosAgregados
              }{" "}
              {pedido.length}
            </p>
            <p className="InformacionDelPedido__ListaProductos__Titulo__Texto">
              {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Total}{" "}
              {CalcularTotalPedido(pedido)}
            </p>
          </span>
          <div className="InformacionDelPedido__ListaProductos__Encabezado">
            <p>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Detalles}</p>
            <p>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Importe}</p>
            <p>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Opciones}</p>
          </div>
          {pedido.map(
            (
              {
                idProducto,
                Producto,
                Peso,
                Ancho,
                Largo,
                Alto,
                ContenidoDeEnvio,
                ValorDeclarado,
                ValorAsegurado,
                CostoEnvio,
                CostoSobrePeso,
                CostoSeguro,
                PieCubico,
              },
              index
            ) => (
              <div
                className="InformacionDelPedido__ListaProductos__Cuerpo"
                key={index}
              >
                <span className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles">
                  <p>
                    <ion-icon name="basket"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Producto}:
                    </b>{" "}
                    {Producto}
                  </p>
                  <p>
                    <ion-icon name="expand"></ion-icon>{" "}
                    <b>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Medidas}:</b>{" "}
                    {Ancho}x{Largo}x{Alto}
                  </p>
                  <p>
                    <ion-icon name="document-text"></ion-icon>{" "}
                    <b>
                      {
                        DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma]
                          .ContenidoDelEnvio
                      }
                      :
                    </b>{" "}
                    {ContenidoDeEnvio}
                  </p>
                  <p>
                    <ion-icon name="scale"></ion-icon>{" "}
                    <b>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Peso}:</b>{" "}
                    {Peso}
                  </p>
                  <p>
                    <ion-icon name="cube"></ion-icon>{" "}
                    <b>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].FT}: </b>
                    {PieCubico}
                  </p>
                </span>
                <span className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles">
                  <p className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Declarado}:
                    </b>{" "}
                    {Number(ValorDeclarado).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles--Texto Rojo">
                    <ion-icon name="shield-checkmark"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Asegurado}:
                    </b>{" "}
                    {Number(ValorAsegurado).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon>{" "}
                    <b>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].TCF}:</b>{" "}
                    $0.00
                  </p>
                  <p className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="airplane"></ion-icon>{" "}
                    <b>{DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].Envio}:</b>{" "}
                    {CostoEnvio.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="shield"></ion-icon>{" "}
                    <b>
                      {DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma].CostoSeguro}:
                    </b>{" "}
                    {CostoSeguro.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="scale"></ion-icon>{" "}
                    <b>
                      {
                        DICCIONARIO_INFORMACION_DEL_PEDIDO[Idioma]
                          .CargoSobrePeso
                      }
                      :
                    </b>{" "}
                    {CostoSobrePeso.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </span>
                <span className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles">
                  <button
                    className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles__Boton Eliminar"
                    onClick={() =>
                      EliminarProductoDelPedido(Producto, idProducto)
                    }
                  >
                    {DICCIONARIO_BOTONES[Idioma].Eliminar}
                  </button>
                  <button className="InformacionDelPedido__ListaProductos__Cuerpo__Detalles__Boton UltimaMilla">
                    {DICCIONARIO_BOTONES[Idioma].UltimaMilla}
                  </button>
                </span>
              </div>
            )
          )}
        </section>
      )}
      <footer className="InformacionDelPedido__Footer">
        <button
          className="InformacionDelPedido__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          {DICCIONARIO_BOTONES[Idioma].Regresar}
        </button>
        {pedido.length > 0 && (
          <button
            className="InformacionDelPedido__Footer__Boton Finalizar"
            onClick={GuardarTodaLaInformacionEnLaBD}
          >
            {DICCIONARIO_BOTONES[Idioma].Finalizar}
          </button>
        )}
      </footer>
    </>
  );
}
