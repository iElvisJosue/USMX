/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/RealizarPedido/BarraDeProgreso.css";

export default function BarraDeProgreso({
  Progreso,
  IconoUno = "folder",
  TextoUno = "Paso 1",
  IconoDos = "folder",
  TextoDos = "Paso 2",
  IconoTres = "folder",
  TextoTres = "Paso 3",
}) {
  const CLASE_PASO_UNO = `BarraDeProgreso__Paso ${Progreso[0]}`;
  const CLASE_PASO_DOS = `BarraDeProgreso__Paso ${Progreso[1]}`;
  const CLASE_PASO_TRES = `BarraDeProgreso__Paso ${Progreso[2]}`;

  return (
    <section className="BarraDeProgreso">
      <span className={CLASE_PASO_UNO}>
        <p className="BarraDeProgreso__Paso--Número">1</p>
        <p className="BarraDeProgreso__Paso--Texto">
          <ion-icon name={IconoUno}></ion-icon> {TextoUno}
        </p>
      </span>
      <span className={CLASE_PASO_DOS}>
        <p className="BarraDeProgreso__Paso--Número">2</p>
        <p className="BarraDeProgreso__Paso--Texto">
          <ion-icon name={IconoDos}></ion-icon> {TextoDos}
        </p>
      </span>
      <span className={CLASE_PASO_TRES}>
        <p className="BarraDeProgreso__Paso--Número">3</p>
        <p className="BarraDeProgreso__Paso--Texto">
          <ion-icon name={IconoTres}></ion-icon> {TextoTres}
        </p>
      </span>
    </section>
  );
}
