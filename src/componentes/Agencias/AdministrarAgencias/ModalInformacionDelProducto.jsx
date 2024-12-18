/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ModalInformacionDelProducto.css";

export default function ModalInformacionDelProducto({
  Idioma,
  agencia,
  informacionDelProducto,
  establecerMostrarModal,
  buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { AsignarProductoAgencia, ActualizarProductoAgencia } = useAgencias();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue(
      "PesoSinCobroProducto",
      informacionDelProducto.PesoSinCobroProducto
    );
    setValue("PesoMaximoProducto", informacionDelProducto.PesoMaximoProducto);
    if (informacionDelProducto.Editable) {
      setValue("PrecioProducto", informacionDelProducto.PrecioProducto);
      setValue("ComisionProducto", informacionDelProducto.ComisionProducto);
      setValue("LibraExtraProducto", informacionDelProducto.LibraExtraProducto);
    } else {
      setValue(
        "PrecioProducto",
        Number(informacionDelProducto.PrecioProducto).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      );
      setValue(
        "ComisionProducto",
        Number(informacionDelProducto.ComisionProducto).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )
      );
      setValue(
        "LibraExtraProducto",
        Number(informacionDelProducto.LibraExtraProducto).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )
      );
    }
  }, []);
  const PeticionAdministrarProductoAgencia = handleSubmit(async (data) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const InfProducto = {
        idAgencia: agencia.idAgencia,
        idProducto: informacionDelProducto.idProducto,
        PrecioProducto: data.PrecioProducto,
        ComisionProducto: data.ComisionProducto,
        LibraExtraProducto: data.LibraExtraProducto,
        PesoMaximoProducto: data.PesoMaximoProducto,
        PesoSinCobroProducto: data.PesoSinCobroProducto,
        idUnionAgenciasProductos:
          informacionDelProducto.idUnionAgenciasProductos,
      };
      // SI TENEMOS LA PROPIEDAD ACTUALIZAR EN TRUE ES PORQUE VAMOS A ACTUALIZAR LA INFORMACION
      // DEL PRODUCTO ASIGNADO A LA AGENCIA, DE LO CONTRARIO ES PORQUE VAMOS A ASIGNAR UN PRODUCTO
      const res = informacionDelProducto.Actualizar
        ? await ActualizarProductoAgencia(InfProducto)
        : await AsignarProductoAgencia(InfProducto);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia(
          !buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
        );
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
      establecerMostrarModal(false);
    }
  });

  const MensajeDeError = (NombreDelCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreDelCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small
              key={type}
              className="ModalInformacionDelProducto__MensajeDeError"
            >
              {message}
            </small>
          ))
        }
      />
    );
  };

  const ClaseInputs = informacionDelProducto.Editable
    ? "ModalInformacionDelProducto__Contenido--Informacion--Input"
    : "ModalInformacionDelProducto__Contenido--Informacion--Input Desactivado";

  return (
    <div className="ModalInformacionDelProducto">
      <form
        className="ModalInformacionDelProducto__Contenido"
        onSubmit={PeticionAdministrarProductoAgencia}
      >
        <button
          type="button"
          className="ModalInformacionDelProducto__Contenido--CerrarModal"
          onClick={() => establecerMostrarModal(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDelProducto__Contenido--Titulo">
          {
            DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma]
              .DetallesDelProducto
          }
        </h1>
        <small className="ModalInformacionDelProducto__Contenido--Informacion Col2">
          <ion-icon name="basket"></ion-icon>{" "}
          <b>{DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].Producto}</b>
          {informacionDelProducto.NombreProducto}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="cash"></ion-icon>{" "}
          <b>
            {DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].PrecioPublico}
          </b>
          <input
            className={ClaseInputs}
            type="text"
            name="PrecioProducto"
            {...register("PrecioProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("PrecioProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="cash"></ion-icon>{" "}
          <b>{DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].Comision}</b>
          <input
            className={ClaseInputs}
            type="text"
            name="ComisionProducto"
            {...register("ComisionProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("ComisionProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="scale"></ion-icon>{" "}
          <b>{DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].LibraExtra}</b>
          <input
            className={ClaseInputs}
            type="text"
            name="LibraExtraProducto"
            {...register("LibraExtraProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("LibraExtraProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="thumbs-up"></ion-icon>{" "}
          <b>
            {DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].PesoSinCobro}
          </b>
          <input
            className={ClaseInputs}
            type="text"
            name="PesoSinCobroProducto"
            {...register("PesoSinCobroProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("PesoSinCobroProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion Col2">
          <ion-icon name="warning"></ion-icon>{" "}
          <b>{DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].PesoMaximo}</b>
          <input
            className={ClaseInputs}
            type="text"
            name="PesoMaximoProducto"
            {...register("PesoMaximoProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("PesoMaximoProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion Col2">
          <ion-icon name="expand"></ion-icon>{" "}
          <b>{DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].Medidas}</b>
          {DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].Ancho}{" "}
          {informacionDelProducto.AnchoProducto} -{" "}
          {DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].Alto}{" "}
          {informacionDelProducto.AltoProducto} -{" "}
          {DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO[Idioma].Largo}{" "}
          {informacionDelProducto.LargoProducto}
        </small>
        {informacionDelProducto.Editable && (
          <button
            type="submit"
            className="ModalInformacionDelProducto__Contenido--Boton"
          >
            {informacionDelProducto.Actualizar
              ? `${DICCIONARIO_BOTONES[Idioma].Actualizar}`
              : `${DICCIONARIO_BOTONES[Idioma].Asignar}`}
          </button>
        )}
      </form>
    </div>
  );
}
