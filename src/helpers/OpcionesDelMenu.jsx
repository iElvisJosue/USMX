// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { HOST } from "./Urls";
import { ListaDeIdiomas } from "../Diccionario/Idiomas";

export default function OpcionesDelMenu() {
  const { idioma } = useConfiguracion();

  const OpcionesMenu = {
    Administrador: [
      {
        icono: "person-circle",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Perfil}`,
        url: `${HOST}Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Pedidos}`,
            url: `${HOST}Pedidos`,
          },
        ],
      },
      {
        icono: "business",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Agencias}`,
        url: `${HOST}Agencias`,
      },
      {
        icono: "basket",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Productos}`,
        url: `${HOST}Productos`,
      },
      {
        icono: "people-circle",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Usuarios}`,
        url: `${HOST}Usuarios`,
      },
      {
        icono: "code-working",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Operaciones}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "car",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Movimientos}`,
            url: `${HOST}Movimientos`,
          },
        ],
      },
      {
        icono: "alert-circle",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Ocurres}`,
        url: `${HOST}Ocurres`,
      },
      {
        icono: "settings",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Configuracion}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "archive",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Cargas}`,
            url: `${HOST}Cargas`,
          },
          {
            icono: "airplane",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Envios}`,
            url: `${HOST}Envios`,
          },
          {
            icono: "globe",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Ubicaciones}`,
            url: `${HOST}Ubicaciones`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Apariencia}`,
        url: `${HOST}Apariencia`,
      },
    ],
    Usuario: [
      {
        icono: "person-circle",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Perfil}`,
        url: `${HOST}Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Pedidos}`,
            url: `${HOST}Pedidos`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Apariencia}`,
        url: `${HOST}Apariencia`,
      },
    ],
    Moderador: [
      {
        icono: "person-circle",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Perfil}`,
        url: `${HOST}Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${ListaDeIdiomas.VistaMenu[idioma].Pedidos}`,
            url: `${HOST}Pedidos`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${ListaDeIdiomas.VistaMenu[idioma].Apariencia}`,
        url: `${HOST}Apariencia`,
      },
    ],
  };

  return {
    OpcionesMenu,
  };
}
