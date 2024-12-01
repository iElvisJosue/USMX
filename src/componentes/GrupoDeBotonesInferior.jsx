/* eslint-disable react/prop-types */
// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_BOTONES } from "../diccionario/Diccionario";
// IMPORTAMOS SUS ESTILOS
import "../estilos/componentes/GrupoDeBotonesInferior.css";
export default function GrupoDeBotonesInferior({
  idioma = "es",
  FuncionCancelar = () => {},
  BotonCancelar = false,
  BotonRegistrar = false,
  BotonBuscar = false,
  BotonActualizar = false,
  BotonSiguiente = false,
  BotonFinalizar = false,
}) {
  return (
    <span className="GrupoDeBotonesInferior">
      {BotonCancelar && (
        <button
          className="GrupoDeBotonesInferior--Boton Cancelar"
          onClick={FuncionCancelar}
        >
          {DICCIONARIO_BOTONES[idioma].Cancelar}
        </button>
      )}
      {BotonRegistrar && (
        <button className="GrupoDeBotonesInferior--Boton Registrar">
          {DICCIONARIO_BOTONES[idioma].Registrar}
        </button>
      )}
      {BotonActualizar && (
        <button className="GrupoDeBotonesInferior--Boton Actualizar">
          {DICCIONARIO_BOTONES[idioma].Actualizar}
        </button>
      )}
      {BotonBuscar && (
        <button className="GrupoDeBotonesInferior--Boton Actualizar">
          {DICCIONARIO_BOTONES[idioma].Buscar}
        </button>
      )}
      {BotonSiguiente && (
        <button className="GrupoDeBotonesInferior--Boton Siguiente">
          {DICCIONARIO_BOTONES[idioma].Siguiente}
        </button>
      )}
      {BotonFinalizar && (
        <button className="GrupoDeBotonesInferior--Boton Registrar">
          {DICCIONARIO_BOTONES[idioma].Finalizar}
        </button>
      )}
    </span>
  );
}
