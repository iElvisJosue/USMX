/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import TablaEncabezado from "./TablaEncabezado";
import TablaFilas from "./TablaFilas";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Tabla/Tabla.css";
export default function Tabla({
  ColorTabla = "",
  ContenidoTabla = [],
  EncabezadoTabla = [],
  FilasTabla = [],
}) {
  return (
    <div className="Tabla">
      <table className="Tabla__Cuerpo">
        <TablaEncabezado
          ColorTabla={ColorTabla}
          EncabezadoTabla={EncabezadoTabla}
        />
        <TablaFilas ContenidoTabla={ContenidoTabla} Filas={FilasTabla} />
      </table>
    </div>
  );
}
