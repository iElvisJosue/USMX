/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Tabla/TablaEncabezado.css";
export default function TablaEncabezado({ EncabezadoTabla, ColorTabla }) {
  const CLASE_COLOR_TABLA = `Tabla__Cuerpo__Encabezado--TR--TH ${ColorTabla}`;

  return (
    <thead className="Tabla__Cuerpo__Encabezado">
      <tr className="Tabla__Cuerpo__Encabezado--TR">
        {EncabezadoTabla.map(({ Icono, Texto }, index) => (
          <th className={CLASE_COLOR_TABLA} key={index}>
            <ion-icon name={Icono}></ion-icon>
            <br />
            {Texto}
          </th>
        ))}
      </tr>
    </thead>
  );
}
