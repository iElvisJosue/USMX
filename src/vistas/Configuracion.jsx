// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import MenuConfiguracion from "../componentes/Configuracion/MenuConfiguracion";
import Apariencia from "../componentes/Configuracion/Apariencia";
import Cargas from "../componentes/Configuracion/Cargas";
import Envios from "../componentes/Configuracion/Envios";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Configuracion.css";

export default function Configuracion() {
  const [vista, establecerVista] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: Apariencia,
    1: Apariencia,
    2: Cargas,
    3: Envios,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado icono="settings" seccion="Configuración" />
      <div className="Configuracion">
        <MenuConfiguracion {...valoresParaLosComponentes} />
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
