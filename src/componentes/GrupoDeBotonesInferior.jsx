/* eslint-disable react/prop-types */
// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_BOTONES } from "../diccionario/Diccionario";
// IMPORTAMOS SUS ESTILOS
import "../estilos/componentes/GrupoDeBotonesInferior.css";
export default function GrupoDeBotonesInferior({
  Idioma = "es",
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
          {DICCIONARIO_BOTONES[Idioma].Cancelar}
        </button>
      )}
      {BotonRegistrar && (
        <button className="GrupoDeBotonesInferior--Boton Registrar">
          {DICCIONARIO_BOTONES[Idioma].Registrar}
        </button>
      )}
      {BotonActualizar && (
        <button className="GrupoDeBotonesInferior--Boton Actualizar">
          {DICCIONARIO_BOTONES[Idioma].Actualizar}
        </button>
      )}
      {BotonBuscar && (
        <button className="GrupoDeBotonesInferior--Boton Actualizar">
          {DICCIONARIO_BOTONES[Idioma].Buscar}
        </button>
      )}
      {BotonSiguiente && (
        <button className="GrupoDeBotonesInferior--Boton Siguiente">
          {DICCIONARIO_BOTONES[Idioma].Siguiente}
        </button>
      )}
      {BotonFinalizar && (
        <button className="GrupoDeBotonesInferior--Boton Registrar">
          {DICCIONARIO_BOTONES[Idioma].Finalizar}
        </button>
      )}
    </span>
  );
}
