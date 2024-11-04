/* eslint-disable react/prop-types */

// LOS ESTILOS ESTÁN EN ModalSubirArchivo.css
export default function ModalSubirArchivoError({
  esRemitente,
  establecerContenidoModal,
}) {
  return (
    <section className="ModalSubirArchivo__Contenido--Error">
      <img
        src="SubidaError.png"
        alt="Imagen de subida no completada"
        className="ModalSubirArchivo__Contenido--Error--Imagen"
      />
      <p className="ModalSubirArchivo__Contenido--Error--Texto">
        ¡Oops! Parece que algo salió mal al insertar la información de los{" "}
        {esRemitente ? "REMITENTES " : "DESTINATARIOS "} por favor, intenta de
        nuevo más tarde.
      </p>
      <button
        className="ModalSubirArchivo__Contenido--Error--Boton"
        type="button"
        onClick={() => establecerContenidoModal(0)}
      >
        Regresar
      </button>
    </section>
  );
}
