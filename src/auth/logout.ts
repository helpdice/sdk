import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import { clearStorage, getDataFromStorage } from "../utils/localStorage.js";

const logout = (
	data: { data?: unknown },
	{
		config,
		onFetching,
		onSuccess,
		onError,
		onSettled,
	}: {
		onFetching?: () => void;
		onSuccess?: (data: object) => void;
		onError?: (error: string) => void;
		onSettled?: () => void;
		config?: { params: unknown };
	},
) => {
	return handler(
		post(
			getUrl("auth", "v1", "logout"),
			{ ...data, fcm_token: getDataFromStorage("fcm_token") },
			config,
		),
		{
			onFetching: () => onFetching?.(),
			onError: (error) => onError?.(error),
			onSuccess: (data) => {
				clearStorage(["accountAccessToken", "accountInfo", "account_key"]);
				onSuccess?.(data);
				window.location.href = "/";
			},
			onSettled: () => onSettled?.(),
		},
	);
};

export default logout;
