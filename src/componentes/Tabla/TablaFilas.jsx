/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Tabla/TablaFilas.css";
export default function TablaFilas({ ContenidoTabla, Filas }) {
  return (
    <tbody className="Tabla__Cuerpo__Filas">
      {ContenidoTabla.map((contenido, index) => (
        <tr key={index} className="Tabla__Cuerpo__Filas--TR">
          {Filas.map(({ TextoUno, TextoDos, Botones }, index) =>
            Botones ? (
              <td className="Tabla__Cuerpo__Filas--TR--TD Botones" key={index}>
                {Botones.map(
                  (
                    {
                      FuncionBoton,
                      IconoBoton,
                      TituloBoton,
                      Completa,
                      ColorBoton,
                    },
                    index
                  ) => (
                    <button
                      className={`Tabla__Cuerpo__Filas--TR--TD--Boton ${ColorBoton}`}
                      onClick={() => FuncionBoton(contenido, Completa)}
                      title={TituloBoton}
                      key={index}
                    >
                      <ion-icon name={IconoBoton}></ion-icon>
                    </button>
                  )
                )}
              </td>
            ) : (
              <td className="Tabla__Cuerpo__Filas--TR--TD" key={index}>
                {contenido[TextoUno]} {TextoDos && contenido[TextoDos]}
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}
