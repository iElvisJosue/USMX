// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeCiudades from "../componentes/AdministrarCiudades/ListaDeCiudades";
// import EditarEstado from "../componentes/AdministrarCiudades/EditarEstado";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarCiudades.css";

export default function AdministrarCiudades() {
  const [informacionDeLaCiudad, establecerInformacionDeLaCiudad] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDeLaCiudad,
    establecerInformacionDeLaCiudad,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeCiudades,
    // 1: EditarEstado,
  };

  const TituloSubseccion = {
    0: "Administrar Ciudades",
    1: "Administrar Ciudades / Editar Ciudad",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="locate"
        seccion="Ciudades"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarCiudades">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
