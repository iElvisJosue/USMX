// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SeleccionarAgencia from "../componentes/SeleccionarAgencia";
import ListaDeProductosDeLaAgencia from "../componentes/AsignarProductoAgencia/ListaDeProductosDeLaAgencia";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AsignarProductoAgencia.css";

export default function AsignarProductoAgencia() {
  const { usuario } = useGlobal();
  const [paso, establecerPaso] = useState(0);
  const [agencia, establecerAgencia] = useState(null);
  const [pedido, establecerPedido] = useState(null);

  const EstablecerInformacionDeLaAgenciaYMostrarSuInformación = (agencia) => {
    toast.success(
      `Agencia ${agencia.NombreAgencia.toUpperCase()} seleccionada con éxito ✨`
    );
    establecerAgencia(agencia);
    establecerPaso(1);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    agencia,
    establecerAgencia,
    paso,
    establecerPaso,
    pedido,
    establecerPedido,
    usuario,
    FuncionParaRealizar: EstablecerInformacionDeLaAgenciaYMostrarSuInformación,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: SeleccionarAgencia,
    1: ListaDeProductosDeLaAgencia,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion="Agencias"
        subseccion="Asignar Productos"
      />
      <div className="AsignarProductoAgencia">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
