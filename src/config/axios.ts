import type { AxiosResponse } from "axios";
import axios from "axios";

import {
	API_URL,
	REFRESH_TOKEN_KEY,
	TOKEN_KEY,
	// TOKEN_THRESHOLD_KEY,
} from "./constants.js";

// import { handleItem, setThreshold } from './local-storage';
// import { handleItem, setThreshold } from './local-storage';
import type { AuthRequest, SignupRequest } from "../auth/types.js";
import { getCookie } from "../utils/auth.js";
import { Env } from "./Env.js";

export const http = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
});

export const chttp = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
});

export const post = (
	endpoint: string,
	data?: unknown,
	config?: object,
): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.post(endpoint, data, config)
			.then(resolve)
			.catch((e) => reject(e.response?.data)),
	);

export const get = (
	endpoint: string,
	config?: object,
): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.get(endpoint, config)
			.then(resolve)
			.catch((e) => reject(e.response?.data)),
	);

export const patch = <T>(endpoint: string, data: T): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.patch(endpoint, data)
			.then(resolve)
			.catch((e) => reject(e.response.data)),
	);

export const login = (data: AuthRequest): Promise<AxiosResponse> =>
	post("passport/basic/login", data);

export const logout = (): Promise<AxiosResponse> => post("user/logout");

export const passwordReset = (
	data: Partial<AuthRequest>,
): Promise<AxiosResponse> => post("user/reset-password", data);

export const signup = (data: SignupRequest): Promise<AxiosResponse> =>
	post("passport/basic/signup", data);

/* For Client Side Handling */

http.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers["Content-Type"] = "application/json";
		config.headers.Authorization = `Bearer ${getCookie()}` || "";
		config.headers["HB-API-KEY"] =
			`Bearer ${Env.runtimeEnv.HELPDICE_API_KEY}` || "";
	}
	return config;
}, Promise.reject);

chttp.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers["Content-Type"] = "application/json";
		config.headers.Authorization = localStorage.getItem(TOKEN_KEY) || "";
	}
	return config;
}, Promise.reject);

chttp.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.code === "ERR_NETWORK") {
			return Promise.reject(error);
		}

		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

		if (!refreshToken) {
			return Promise.reject(error);
		}

		// const originalRequest = error.config;

		// if (error.response.status === 401 && !originalRequest._retry) {
		//   originalRequest._retry = true;

		//   if (http.defaults.headers) {
		//     http.defaults.headers.Authorization = `Bearer ${refreshToken}`;
		//   }

		//   try {
		//     const res = await post('auth/token');
		//     const { access_token, threshold } = res.data;

		//     // handleItem(TOKEN_KEY, access_token);
		//     // handleItem(TOKEN_THRESHOLD_KEY, setThreshold(threshold));

		//     if (http.defaults.headers) {
		//       http.defaults.headers.Authorization = access_token;
		//     }
		//     return await http(originalRequest);
		//   } catch (reason) {
		//     return Promise.reject(reason);
		//   }
		// }

		return Promise.reject(error);
	},
);
