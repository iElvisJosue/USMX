/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../../../context/SistemaContext";
import { useBodega } from "../../../../context/BodegaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_LISTA_SALIDAS } from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../../componentes/Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/SalidasBodega/CrearSalida/ListaSalidas.css";

export default function ListaSalidas({
  Idioma,
  informacionDeLaSalida,
  salida,
  establecerSalida,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { infUsuario } = useSistema();
  const { CrearSalida } = useBodega();
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const PeticionParaCrearSalidas = handleSubmit(async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    const infSalidas = {
      idUsuario: infUsuario.idUsuario,
      infSalida: informacionDeLaSalida,
      salida,
    };
    establecerPeticionPendiente(true);
    try {
      const res = await CrearSalida(infSalidas);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerSalida([]);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });
  const QuitarGuiaDeLaSalida = (idPedido) => {
    const nuevaSalida = salida.filter((guia) => guia.idPedido !== idPedido);
    establecerSalida(nuevaSalida);
  };
  return (
    <form className="ListaSalidas" onSubmit={PeticionParaCrearSalidas}>
      <h1 className="ListaSalidas__Titulo">
        {DICCIONARIO_LISTA_SALIDAS[Idioma].ListaDeGuias} ({salida.length})
      </h1>
      <div className="ListaSalidas__Cuerpo" key={salida.length}>
        <table className="ListaSalidas__Cuerpo--Tabla">
          <thead className="ListaSalidas__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>
                <ion-icon name="analytics"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_SALIDAS[Idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_SALIDAS[Idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_SALIDAS[Idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_SALIDAS[Idioma].Peso}
              </th>
              <th>
                <ion-icon name="code-working"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_SALIDAS[Idioma].Acciones}
              </th>
            </tr>
          </thead>
          <tbody className="ListaSalidas__Cuerpo--Tabla__Cuerpo">
            {salida.map((infSalida) => (
              <tr
                key={infSalida.idPedido}
                className={"ListaSalidas__Cuerpo--Tabla__Cuerpo--TR"}
              >
                <td>{infSalida.GuiaPedido}</td>
                <td>{infSalida.ContenidoPedido}</td>
                <td>
                  Alto: {infSalida.AltoPedido}
                  <br />
                  Ancho: {infSalida.AnchoPedido}
                  <br />
                  Largo: {infSalida.LargoPedido}
                </td>
                <td>{infSalida.PesoPedido}</td>
                <td className="ListaSalidas__Cuerpo--Tabla__Cuerpo__Acciones">
                  <button
                    type="button"
                    title="Quitar"
                    onClick={() => QuitarGuiaDeLaSalida(infSalida.idPedido)}
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
