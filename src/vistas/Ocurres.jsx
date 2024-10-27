// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarOcurre from "../componentes/Ocurres/RegistrarOcurre/RegistrarOcurre.jsx";
import AdministrarOcurres from "../componentes/Ocurres/AdministrarOcurres/AdministrarOcurres";

export default function Ocurres() {
  const [vistaOcurres, establecerVistaOcurres] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: "Registrar Ocurre",
      Icono: "add-circle",
    },
    {
      Texto: "Administrar Ocurres",
      Icono: "cog",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarOcurre,
    1: AdministrarOcurres,
  };

  const TituloSubseccion = {
    0: "Registrar Ocurre",
    1: "Administrar Ocurres",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOcurres];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="alert-circle"
        seccion="Ocurres"
        subseccion={TituloSubseccion[vistaOcurres]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaOcurres}
        establecerVista={establecerVistaOcurres}
      />
      <ComponenteParaRenderizar />
      <Toaster richColors position="top-right" />
    </main>
  );
}
