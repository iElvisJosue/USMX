/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../../../context/GlobalContext";
import { useBodega } from "../../../../context/BodegaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_LISTA_DEVOLUCIONES } from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../../componentes/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../../helpers/ObtenerCookie";
import { MensajePeticionPendiente } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/Devoluciones/CrearDevolucion/ListaDevoluciones.css";

export default function ListaDevoluciones({
  idioma,
  devolucion,
  establecerDevolucion,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { usuario } = useGlobal();
  const { CrearDevolucion } = useBodega();
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const PeticionParaCrearDevolucion = handleSubmit(async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    let infDevoluciones = {
      CookieConToken: COOKIE_CON_TOKEN,
      idUsuario: usuario.idUsuario,
      devolucion,
    };
    try {
      const res = await CrearDevolucion(infDevoluciones);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerDevolucion([]);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });
  const QuitarGuiaDeLaDevolucion = (idPedido) => {
    const nuevaDevolucion = devolucion.filter(
      (guia) => guia.idPedido !== idPedido
    );
    establecerDevolucion(nuevaDevolucion);
  };
  return (
    <form className="ListaDevoluciones" onSubmit={PeticionParaCrearDevolucion}>
      <h1 className="ListaDevoluciones__Titulo">
        {DICCIONARIO_LISTA_DEVOLUCIONES[idioma].ListaDeGuias} (
        {devolucion.length})
      </h1>
      <div className="ListaDevoluciones__Cuerpo" key={devolucion.length}>
        <table className="ListaDevoluciones__Cuerpo--Tabla">
          <thead className="ListaDevoluciones__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>
                <ion-icon name="bag-check"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DEVOLUCIONES[idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DEVOLUCIONES[idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DEVOLUCIONES[idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DEVOLUCIONES[idioma].Peso}
              </th>
              <th>
                <ion-icon name="code-working"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_DEVOLUCIONES[idioma].Acciones}
              </th>
            </tr>
          </thead>
          <tbody className="ListaDevoluciones__Cuerpo--Tabla__Cuerpo">
            {devolucion.map((pedido) => (
              <tr
                key={pedido.idPedido}
                className={"ListaDevoluciones__Cuerpo--Tabla__Cuerpo--TR"}
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
                <td className="ListaDevoluciones__Cuerpo--Tabla__Cuerpo__Acciones">
                  <button
                    type="button"
                    title="Quitar"
                    onClick={() => QuitarGuiaDeLaDevolucion(pedido.idPedido)}
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