// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Bienvenida.css";

export default function Bienvenida() {
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado icono="sparkles" seccion="Bienvenido" />
      <div className="Bienvenida">
        <img src="Logo-USMX.png" alt="Logo USMX" />
        <p>¡Bienvenido al sistema de USMX XPRESS!</p>
        <p>Gestiona tus envíos de paquetería de manera rápida y sencilla.</p>
        <p>¡Comienza ahora a rastrear y administrar tus paquetes!</p>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
