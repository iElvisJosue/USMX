// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "./Urls";

export const ColocarIconoYNombreDelSitio = (LogoSistema, NombreSistema) => {
  const IconoSitio = document.getElementById("IconoSistema");
  IconoSitio.href = `${HOST_IMAGENES}/${LogoSistema}`;
  document.title = `${NombreSistema || "Sistema"}`;
};
