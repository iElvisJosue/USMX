import "../../estilos/componentes/Globales/Cargando.css";

// eslint-disable-next-line react/prop-types
export default function Cargando({ ClaseCargando = "" }) {
  return (
    <section className={`Main__Cargando ${ClaseCargando}`}>
      <div className="Cargando"></div>
      <h1>Cargando...</h1>
    </section>
  );
}
