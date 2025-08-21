import Cookies from "js-cookie";
import type { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { Env } from "../config/Env.js";

export const getCookie = (
	key = Env.runtimeEnv.TOKEN_KEY,
): string | undefined => {
	// console.log(Cookies.get(key));
	if (key) return Cookies.get(key);
	return "";
};

export const isAuth = () => !!getCookie();

export const getServerSideToken = (ctx: NextPageContext) => {
	const { token } = parseCookies(ctx);
	return token;
};
