// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_OCURRES } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarOcurre from "../componentes/Ocurres/RegistrarOcurre/RegistrarOcurre.jsx";
import AdministrarOcurres from "../componentes/Ocurres/AdministrarOcurres/AdministrarOcurres";

export default function Ocurres() {
  const { idioma } = useConfiguracion();
  const [vistaOcurres, establecerVistaOcurres] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_OCURRES[idioma].RegistrarOcurre,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_OCURRES[idioma].AdministrarOcurres,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarOcurre,
    1: AdministrarOcurres,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_OCURRES[idioma].RegistrarOcurre,
    1: DICCIONARIO_OCURRES[idioma].AdministrarOcurres,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOcurres];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="alert-circle"
        seccion={DICCIONARIO_OCURRES[idioma].Ocurres}
        subseccion={TituloSubseccion[vistaOcurres]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaOcurres}
        establecerVista={establecerVistaOcurres}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      <Toaster richColors position="top-right" />
    </main>
  );
}
