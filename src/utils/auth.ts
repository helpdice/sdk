import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import type { NextPageContext } from "next";

export const getCookie = (key: string = "ACID"): string | undefined => {
  return Cookies.get(key);
};

export const isAuth = () => (getCookie() ? true : false);

export const getServerSideToken = (ctx: NextPageContext) => {
  const { token } = parseCookies(ctx);
  return token;
};
