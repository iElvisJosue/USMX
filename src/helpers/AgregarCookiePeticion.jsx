import Cookies from "js-cookie";
const cookies = Cookies.get();

export const COOKIE_CON_TOKEN = cookies.TOKEN_DE_ACCESO_USMX;

export const AgregarCookiePeticion = (data = {}) => {
  return { ...data, CookieConToken: COOKIE_CON_TOKEN };
};