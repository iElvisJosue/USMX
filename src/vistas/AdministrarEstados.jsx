// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeEstados from "../componentes/AdministrarEstados/ListaDeEstados";
// import EditarEstado from "../componentes/AdministrarEstados/EditarEstado";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarEstados.css";

export default function AdministrarEstados() {
  const [informacionDelEstado, establecerInformacionDelEstado] = useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDelEstado,
    establecerInformacionDelEstado,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeEstados,
    // 1: EditarEstado,
  };

  const TituloSubseccion = {
    0: "Administrar Estados",
    1: "Administrar Estados / Editar Estado",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="location"
        seccion="Estados"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarEstados">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
