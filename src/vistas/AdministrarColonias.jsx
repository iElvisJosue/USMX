// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeColonias from "../componentes/AdministrarColonias/ListaDeColonias";
// import EditarColonia from "../componentes/AdministrarColonias/EditarColonia";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarColonias.css";

export default function AdministrarColonias() {
  const [informacionDeLaColonia, establecerInformacionDeLaColonia] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDeLaColonia,
    establecerInformacionDeLaColonia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeColonias,
    // 1: EditarColonia,
  };

  const TituloSubseccion = {
    0: "Administrar Colonias",
    1: "Administrar Colonias / Editar Colonia",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="trail-sign"
        seccion="Colonias"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarColonias">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
