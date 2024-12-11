/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";
import { useRecolecciones } from "../../../context/RecoleccionesContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_LISTA_DE_RECOLECCION } from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../componentes/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Recolecciones/CrearRecoleccion/ListaDeRecoleccion.css";

export default function ListaDeRecoleccion({
  idioma,
  recoleccion,
  establecerRecoleccion,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { infUsuario } = useUsuarios();
  const { CrearRecoleccion } = useRecolecciones();
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const PeticionParaCrearRecoleccion = handleSubmit(async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    let infRecoleccion = {
      idUsuario: infUsuario.idUsuario,
      recoleccion,
    };
    try {
      const res = await CrearRecoleccion(infRecoleccion);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerRecoleccion([]);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });
  const QuitarGuiaDeLaRecoleccion = (idPedido) => {
    const nuevaRecoleccion = recoleccion.filter(
      (guia) => guia.idPedido !== idPedido
    );
    establecerRecoleccion(nuevaRecoleccion);
  };
  return (
    <form
      className="Recolecciones__Lista"
      onSubmit={PeticionParaCrearRecoleccion}
    >
      <h1 className="Recolecciones__Lista__Titulo">
        {DICCIONARIO_LISTA_DE_RECOLECCION[idioma].ListaDeGuias} (
        {recoleccion.length})
      </h1>
      <div className="Recolecciones__Lista__Cuerpo" key={recoleccion.length}>
        <table className="Recolecciones__Lista__Cuerpo--Tabla">
          <thead className="Recolecciones__Lista__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>
                <ion-icon name="bag-check"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DE_RECOLECCION[idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DE_RECOLECCION[idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DE_RECOLECCION[idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DE_RECOLECCION[idioma].Peso}
              </th>
              <th>
                <ion-icon name="code-working"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DE_RECOLECCION[idioma].Acciones}
              </th>
            </tr>
          </thead>
          <tbody className="Recolecciones__Lista__Cuerpo--Tabla__Cuerpo">
            {recoleccion.map((pedido) => (
              <tr
                key={pedido.idPedido}
                className={"Recolecciones__Lista__Cuerpo--Tabla__Cuerpo--TR"}
              >
                <td>{pedido.GuiaPedido}</td>
                <td>{pedido.ContenidoPedido}</td>
                <td>
                  Alto: {pedido.AltoPedido}
                  <br />
                  Ancho: {pedido.AnchoPedido}
                  <br />
                  Largo: {pedido.LargoPedido}
                </td>
                <td>{pedido.PesoPedido}</td>
                <td className="Recolecciones__Lista__Cuerpo--Tabla__Cuerpo__Acciones">
                  <button
                    type="button"
                    title="Quitar"
                    onClick={() => QuitarGuiaDeLaRecoleccion(pedido.idPedido)}
                  >
                    <ion-icon name="trash"></ion-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GrupoDeBotonesInferior idioma={idioma} BotonFinalizar={true} />
    </form>
  );
}
