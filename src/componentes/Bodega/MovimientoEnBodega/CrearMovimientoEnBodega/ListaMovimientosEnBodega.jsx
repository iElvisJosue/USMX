/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../../context/UsuariosContext";
import { useBodega } from "../../../../context/BodegaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA } from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../../componentes/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../../helpers/ObtenerCookie";
import { MensajePeticionPendiente } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/CrearMovimientoEnBodega/ListaMovimientosEnBodega.css";

export default function ListaMovimientosEnBodega({
  idioma,
  movimiento,
  establecerMovimiento,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { infUsuario } = useUsuarios();
  const { CrearMovimientoEnBodega } = useBodega();
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const PeticionParaCrearMovimientosEnBodega = handleSubmit(async () => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    let infMovimientos = {
      CookieConToken: COOKIE_CON_TOKEN,
      idUsuario: infUsuario.idUsuario,
      movimientobodega: movimiento,
    };
    try {
      const res = await CrearMovimientoEnBodega(infMovimientos);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerMovimiento([]);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });
  const QuitarGuiaDeLosMovimientos = (idPedido) => {
    const nuevoMovimiento = movimiento.filter(
      (guia) => guia.idPedido !== idPedido
    );
    establecerMovimiento(nuevoMovimiento);
  };
  return (
    <form
      className="ListaMovimientosEnBodega"
      onSubmit={PeticionParaCrearMovimientosEnBodega}
    >
      <h1 className="ListaMovimientosEnBodega__Titulo">
        {DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA[idioma].ListaDeGuias} (
        {movimiento.length})
      </h1>
      <div className="ListaMovimientosEnBodega__Cuerpo" key={movimiento.length}>
        <table className="ListaMovimientosEnBodega__Cuerpo--Tabla">
          <thead className="ListaMovimientosEnBodega__Cuerpo--Tabla--Encabezado">
            <tr>
              <th>
                <ion-icon name="bag-check"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA[idioma].Guia}
              </th>
              <th>
                <ion-icon name="document-text"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA[idioma].Contenido}
              </th>
              <th>
                <ion-icon name="expand"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA[idioma].Medidas}
              </th>
              <th>
                <ion-icon name="scale"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA[idioma].Peso}
              </th>
              <th>
                <ion-icon name="code-working"></ion-icon>
                <br />
                {DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA[idioma].Acciones}
              </th>
            </tr>
          </thead>
          <tbody className="ListaMovimientosEnBodega__Cuerpo--Tabla__Cuerpo">
            {movimiento.map((pedido) => (
              <tr
                key={pedido.idPedido}
                className={
                  "ListaMovimientosEnBodega__Cuerpo--Tabla__Cuerpo--TR"
                }
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
                <td className="ListaMovimientosEnBodega__Cuerpo--Tabla__Cuerpo__Acciones">
                  <button
                    type="button"
                    title="Quitar"
                    onClick={() => QuitarGuiaDeLosMovimientos(pedido.idPedido)}
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
