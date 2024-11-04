/* eslint-disable react/prop-types */

// LOS ESTILOS ESTÁN EN ModalSubirArchivo.css
export default function ModalSubirArchivoCompletado({
  esRemitente,
  establecerContenidoModal,
}) {
  return (
    <section className="ModalSubirArchivo__Contenido--Completado">
      <img
        src="SubidaCompletada.png"
        alt="Imagen de subida completada"
        className="ModalSubirArchivo__Contenido--Completado--Imagen"
      />
      <p className="ModalSubirArchivo__Contenido--Completado--Texto">
        ¡La información de los {esRemitente ? "REMITENTES " : "DESTINATARIOS "}
        ha sido insertada con éxito en la base de datos y asignados a la
        agencia!
      </p>
      <button
        className="ModalSubirArchivo__Contenido--Completado--Boton"
        type="button"
        onClick={() => establecerContenidoModal(0)}
      >
        Regresar
      </button>
    </section>
  );
}
