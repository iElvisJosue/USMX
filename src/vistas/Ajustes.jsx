// LIBRERÍAS A USAR
import { useState } from "react";

// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS COMPONENTES
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import AjustesInformacion from "../componentes/Ajustes/AjustesInformacion";
import AjustesActualizarLogo from "../componentes/Ajustes/AjustesActualizarLogo";
import AjustesActualizarInformacion from "../componentes/Ajustes/AjustesActualizarInformacion";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_AJUSTES } from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Ajustes.css";

export default function Perfil() {
  const {
    infUsuario,
    infSistema,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaAjustes, establecerVistaAjustes] = useState(0);

  // VALORES COMPARTIDOS ENTRE VISTAS
  const ValoresCompartidos = {
    Idioma,
    infSistema,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
    infUsuario,
    establecerVistaAjustes,
  };

  // COMPONENTES PARA RENDERIZAR
  const ListaDeComponentes = {
    0: AjustesInformacion,
    1: AjustesActualizarLogo,
    2: AjustesActualizarInformacion,
  };

  const ComponenteParaRenderizar = ListaDeComponentes[vistaAjustes];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN GENERALES > GENERALES.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="desktop"
        seccion={DICCIONARIO_AJUSTES[Idioma].Sistema}
        subseccion={DICCIONARIO_AJUSTES[Idioma].Ajustes}
      />
      <div className="Perfil">
        <ComponenteParaRenderizar {...ValoresCompartidos} />
      </div>
    </main>
  );
}
