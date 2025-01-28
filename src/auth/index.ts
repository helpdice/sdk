import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { NextPageContext } from "next";
import { getCookie, getServerSideToken, isAuth } from "../utils/auth.js";
import {
	getDataFromStorage,
	setDataInStorage,
	setEncryptionKey,
} from "../utils/localStorage.js";
import logout from "./logout.js";
import signInWithGoogle from "./signInWithGoogle.js";
import signIn from "./signin.js";
import signUp from "./signup.js";

const Auth = {
	signIn,
	signUp,
	signInWithGoogle,
	saveTokenToCookie: (token: string) => {
		cookie.set("ACID", token, { expires: 900000 });
		window.location.href = "/";
	},
	saveTokenToStorage: (token: string) => {
		const accountInfo: {
			_id: string;
			createdAt: string;
		} = jwtDecode(token);
		if (accountInfo) {
			setEncryptionKey("account_key", accountInfo._id + accountInfo.createdAt);
			setDataInStorage("accountAccessToken", token);
			setDataInStorage("accountInfo", accountInfo);
		}
	},
	getTokenFromStorage: () => {
		return getDataFromStorage("accountAccessToken");
	},
	getUserFromStrorage: () => {
		return getDataFromStorage("accountInfo");
	},
	isAuthenticated: (cookie?: boolean) => {
		if (cookie) {
			return isAuth();
		}
		return getDataFromStorage("accountAccessToken") !== undefined;
	},
	getServerToken: (ctx: NextPageContext) => getServerSideToken(ctx),
	logout,
};

export default Auth;
