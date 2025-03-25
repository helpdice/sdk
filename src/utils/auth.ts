import Cookies from "js-cookie";
import type { NextPageContext } from "next";
import { parseCookies } from "nookies";

export const getCookie = (key = "ACID"): string | undefined => {
	// console.log(Cookies.get(key));
	return Cookies.get(key);
};

export const isAuth = () => !!getCookie();

export const getServerSideToken = (ctx: NextPageContext) => {
	const { token } = parseCookies(ctx);
	return token;
};
