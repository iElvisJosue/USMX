// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarAgencia from "../componentes/Agencias/RegistrarAgencia/RegistrarAgencia";
import AdministrarAgencias from "../componentes/Agencias/AdministrarAgencias/AdministrarAgencias";

// IMPORTAMOS LAS AYUDAS A USAR
import { ListaDeIdiomas } from "../Diccionario/Idiomas";

export default function Agencias() {
  const { idioma } = useConfiguracion();
  const [vistaAgencias, establecerVistaAgencias] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: ListaDeIdiomas.VistaAgencias[idioma].RegistrarAgencia,
      Icono: "add-circle",
    },
    {
      Texto: ListaDeIdiomas.VistaAgencias[idioma].AdministrarAgencias,
      Icono: "cog",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarAgencia,
    1: AdministrarAgencias,
  };

  const TituloSubseccion = {
    0: ListaDeIdiomas.VistaAgencias[idioma].RegistrarAgencia,
    1: ListaDeIdiomas.VistaAgencias[idioma].AdministrarAgencias,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaAgencias];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="business"
        seccion={ListaDeIdiomas.VistaAgencias[idioma].Agencias}
        subseccion={TituloSubseccion[vistaAgencias]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaAgencias}
        establecerVista={establecerVistaAgencias}
      />
      <ComponenteParaRenderizar />
      <Toaster richColors position="top-right" />
    </main>
  );
}
