/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_REALIZAR_PEDIDO } from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import BarraDeProgresoPedido from "./BarraDeProgresoPedido";
import SeleccionarAgenciaPedido from "./SeleccionarAgenciaPedido";
import InformacionDelRemitentePedido from "./InformacionDelRemitentePedido";
import InformacionDelDestinatarioPedido from "./InformacionDelDestinatarioPedido";
import InformacionDelPedido from "./InformacionDelPedido";
import DetallesDelPedido from "./DetallesDelPedido";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESOS } from "../../../helpers/RealizarPedido/ListaDeProgreso";
import { ESTILOS_SUCCESS } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Pedidos/RealizarPedido/RealizarPedido.css";

export default function RealizarPedido({ idioma }) {
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [agencia, establecerAgencia] = useState(null);
  const [remitente, establecerRemitente] = useState(null);
  const [destinatario, establecerDestinatario] = useState(null);
  const [pedido, establecerPedido] = useState([]);
  const [detallesPedido, establecerDetallesPedido] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESOS[paso]);
  }, [paso]);

  const EstablecerInformacionDeLaAgencia = (agencia) => {
    toast.success(
      `¡La agencia ${agencia.NombreAgencia.toUpperCase()} ha sido seleccionada con éxito!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
    establecerAgencia(agencia);
    establecerPaso(1);
  };

  const ReiniciarRealizarPedido = () => {
    establecerPaso(0);
    establecerAgencia(null);
    establecerRemitente(null);
    establecerDestinatario(null);
    establecerPedido([]);
    establecerDetallesPedido(null);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
    agencia,
    establecerAgencia,
    paso,
    establecerPaso,
    remitente,
    establecerRemitente,
    destinatario,
    establecerDestinatario,
    pedido,
    establecerPedido,
    establecerProgreso,
    usuario,
    FuncionParaRealizar: EstablecerInformacionDeLaAgencia,
    detallesPedido,
    establecerDetallesPedido,
    ReiniciarRealizarPedido,
  };

  //   ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: SeleccionarAgenciaPedido,
    1: InformacionDelRemitentePedido,
    2: InformacionDelDestinatarioPedido,
    3: InformacionDelPedido,
    4: DetallesDelPedido,
  };

  //   ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  return (
    <div className="RealizarPedido">
      <BarraDeProgresoPedido
        Progreso={progreso}
        IconoUno="person-circle"
        TextoUno={DICCIONARIO_REALIZAR_PEDIDO[idioma].Remitente}
        IconoDos="location"
        TextoDos={DICCIONARIO_REALIZAR_PEDIDO[idioma].Destinatario}
        IconoTres="cube"
        TextoTres={DICCIONARIO_REALIZAR_PEDIDO[idioma].Pedido}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
