// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext.jsx";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_OCURRES } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import SubMenu from "../componentes/Globales/SubMenu";
import RegistrarOcurre from "../componentes/Ocurres/RegistrarOcurre/RegistrarOcurre.jsx";
import AdministrarOcurres from "../componentes/Ocurres/AdministrarOcurres/AdministrarOcurres";

export default function Ocurres() {
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaOcurres, establecerVistaOcurres] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_OCURRES[Idioma].RegistrarOcurre,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_OCURRES[Idioma].AdministrarOcurres,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarOcurre,
    1: AdministrarOcurres,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_OCURRES[Idioma].RegistrarOcurre,
    1: DICCIONARIO_OCURRES[Idioma].AdministrarOcurres,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOcurres];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="alert-circle"
        seccion={DICCIONARIO_OCURRES[Idioma].Ocurres}
        subseccion={TituloSubseccion[vistaOcurres]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaOcurres}
        establecerVista={establecerVistaOcurres}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
