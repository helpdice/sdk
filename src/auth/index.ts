import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { NextPageContext } from "next";
import { Env } from "../config/Env.js";
import { getCookie, getServerSideToken, isAuth } from "../utils/auth.js";
import {
	getDataFromStorage,
	setDataInStorage,
	setEncryptionKey,
} from "../utils/localStorage.js";
import logout from "./logout.js";
import register from "./register.js";
import signInWithGoogle from "./signInWithGoogle.js";
import signIn from "./signin.js";
import signUp from "./signup.js";

const Auth = {
	signIn,
	signUp,
	register,
	signInWithGoogle,
	saveTokenToCookie: (token: string) => {
		if (Env.runtimeEnv.TOKEN_KEY) {
			cookie.set(Env.runtimeEnv.TOKEN_KEY, token, { expires: 900000 });
		}
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
	/**
	 * Action to update stored admin info in the redux
	 * @param {string | object} key key or an object with key: value of the fields to be updated
	 * @param {any} value value of the field to be updated (only if the key passed is of type string)
	 */
	updateUserInfo: (key?: string | object, value?: any) => () => {
		console.log("typeof key: ", typeof key, key);
		try {
			console.log(key);
			const accountInfo = getDataFromStorage("accountInfo");
			if (typeof key === "object") {
				let updatedInfo = { ...accountInfo };
				// for..of
				for (const [ky, value] of Object.entries(key)) {
					updatedInfo = { ...updatedInfo, [ky]: value };
				}
				console.log(updatedInfo);
				setDataInStorage("accountInfo", updatedInfo);
			} else if (typeof key === "string") {
				if (value) {
					setDataInStorage("accountInfo", { ...accountInfo, [key]: value });
				} else {
					console.error(
						"Value is not provided for the given key to update admin info",
					);
				}
			}
		} catch (error) {
			console.error("update logo action ", error);
		}
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
