/* eslint-disable react/prop-types */
export default function ModalSubirArchivoSeleccionar({
  informacionArchivo,
  esRemitente,
  establecerEsRemitente,
  hayArchivo,
  mostrarError,
  ManejarCambiosEnElArchivo,
}) {
  return (
    <>
      <section
        className={`ModalSubirArchivo__Contenido--Opciones ${
          esRemitente ? "Remitentes" : "Destinatarios"
        }`}
      >
        <button
          className="ModalSubirArchivo__Contenido--Opciones--Boton"
          type="button"
          onClick={() => establecerEsRemitente(true)}
        >
          <ion-icon name="person-circle"></ion-icon>
          Remitentes
        </button>
        <button
          className="ModalSubirArchivo__Contenido--Opciones--Boton"
          type="button"
          onClick={() => establecerEsRemitente(false)}
        >
          <ion-icon name="location"></ion-icon> Destinatarios
        </button>
      </section>
      <h1 className="ModalSubirArchivo__Contenido--Titulo">
        SELECCIONAR ARCHIVO
      </h1>
      <picture className="ModalSubirArchivo__Contenido--Imagen">
        <img src="SubirExcel.png" alt="Icono de subir excel" />
      </picture>
      <small className="ModalSubirArchivo__Contenido--Texto">
        Para subir la información de los{" "}
        <b>{esRemitente ? "REMITENTES" : "DESTINATARIOS"}</b> a la agencia{" "}
        <b>{informacionArchivo.NombreAgencia || "N/A"}</b>, debes seleccionar un
        archivo en formato XLSX.
      </small>
      <label className="ModalSubirArchivo__Contenido--Archivo">
        <input
          type="file"
          accept=".xlsx"
          name="Excel"
          onChange={ManejarCambiosEnElArchivo}
        />
        {hayArchivo ? hayArchivo?.name : "Seleccionar"}
      </label>
      {mostrarError && (
        <span className="ModalSubirArchivo__Contenido--Archivo--MensajeDeError">
          ¡Por favor, selecciona un archivo! ⚠️
        </span>
      )}
      <button className="ModalSubirArchivo__Contenido--Boton">Subir</button>
    </>
  );
}
