/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../../../context/SistemaContext";
import { useBodega } from "../../../../context/BodegaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_LISTA_ENTRADAS } from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../../componentes/Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/EntradasBodega/CrearEntrada/ListaEntradas.css";

export default function ListaEntradas({
  Idioma,
  informacionDeLaEntrada,
  entrada,
  establecerEntrada,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { infUsuario } = useSistema();
  const { CrearEntrada } = useBodega();
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const PeticionParaCrearEntradas = handleSubmit(async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    const infEntradas = {
      idUsuario: infUsuario.idUsuario,
      infEntrada: informacionDeLaEntrada,
      entrada,
    };
    establecerPeticionPendiente(true);
    try {
      const res = await CrearEntrada(infEntradas);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerEntrada([]);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });
  const QuitarGuiaDeLaEntrada = (idPedido) => {
    const nuevaEntrada = entrada.filter((guia) => guia.idPedido !== idPedido);
    establecerEntrada(nuevaEntrada);
  };
  return (
    <form className="ListaEntradas" onSubmit={PeticionParaCrearEntradas}>
      <h1 className="ListaEntradas__Titulo">
        {DICCIONARIO_LISTA_ENTRADAS[Idioma].ListaDeGuias} ({entrada.length})
      </h1>
      <div className="ListaEntradas__Cuerpo" key={entrada.length}>
        <table className="ListaEntradas__Cuerpo--Tabla">
          <thead className="ListaEntradas__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>
                <ion-icon name="analytics"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_ENTRADAS[Idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_ENTRADAS[Idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_ENTRADAS[Idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_ENTRADAS[Idioma].Peso}
              </th>
              <th>
                <ion-icon name="code-working"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_ENTRADAS[Idioma].Acciones}
              </th>
            </tr>
          </thead>
          <tbody className="ListaEntradas__Cuerpo--Tabla__Cuerpo">
            {entrada.map((infEntrada) => (
              <tr
                key={infEntrada.idPedido}
                className={"ListaEntradas__Cuerpo--Tabla__Cuerpo--TR"}
              >
                <td>{infEntrada.GuiaPedido}</td>
                <td>{infEntrada.ContenidoPedido}</td>
                <td>
                  Alto: {infEntrada.AltoPedido}
                  <br />
                  Ancho: {infEntrada.AnchoPedido}
                  <br />
                  Largo: {infEntrada.LargoPedido}
                </td>
                <td>{infEntrada.PesoPedido}</td>
                <td className="ListaEntradas__Cuerpo--Tabla__Cuerpo__Acciones">
                  <button
                    type="button"
                    title="Quitar"
                    onClick={() => QuitarGuiaDeLaEntrada(infEntrada.idPedido)}
                  >
                    <ion-icon name="trash"></ion-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GrupoDeBotonesInferior Idioma={Idioma} BotonFinalizar={true} />
    </form>
  );
}
