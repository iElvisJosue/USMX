// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeOcurres from "../componentes/AdministrarOcurres/ListaDeOcurres";
import EditarOcurre from "../componentes/AdministrarOcurres/EditarOcurre";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarOcurres.css";

export default function AdministrarOcurres() {
  const [informacionDelOcurre, establecerInformacionDelOcurre] = useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDelOcurre,
    establecerInformacionDelOcurre,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeOcurres,
    1: EditarOcurre,
  };

  const TituloSubseccion = {
    0: "Administrar Ocurres",
    1: "Administrar Ocurres / Editar Ocurre",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="alert-circle"
        seccion="Ocurre"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarOcurres">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
