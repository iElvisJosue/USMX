import "../estilos/componentes/Cargando.css";

// eslint-disable-next-line react/prop-types
export default function Cargando({ colSpan = "Uno" }) {
  const claseCargando = `Main__Cargando ${colSpan}`;
  return (
    <section className={claseCargando}>
      <div className="Cargando"></div>
      <h1>Cargando...</h1>
    </section>
  );
}
