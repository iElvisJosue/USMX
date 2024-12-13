// LIBRERÍAS A USAR
import { useState } from "react";

// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS COMPONENTES
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import PerfilInformacion from "../componentes/Perfil/PerfilInformacion";
import PerfilActualizarFoto from "../componentes/Perfil/PerfilActualizarFoto";
import PerfilActualizarInformacion from "../componentes/Perfil/PerfilActualizarInformacion";
import PerfilActualizarContraseña from "../componentes/Perfil/PerfilActualizarContraseña";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_PERFIL } from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Perfil.css";

export default function Perfil() {
  const {
    infUsuario,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaPerfil, establecerVistaPerfil] = useState(0);

  // VALORES COMPARTIDOS ENTRE VISTAS
  const ValoresCompartidos = {
    Idioma,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
    infUsuario,
    establecerVistaPerfil,
  };

  // COMPONENTES PARA RENDERIZAR
  const ListaDeComponentes = {
    0: PerfilInformacion,
    1: PerfilActualizarFoto,
    2: PerfilActualizarInformacion,
    3: PerfilActualizarContraseña,
  };

  const ComponenteParaRenderizar = ListaDeComponentes[vistaPerfil];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN GENERALES > GENERALES.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="person-circle"
        seccion={DICCIONARIO_PERFIL[Idioma].Perfil}
      />
      <div className="Perfil">
        <ComponenteParaRenderizar {...ValoresCompartidos} />
      </div>
    </main>
  );
}
