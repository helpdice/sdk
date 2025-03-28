import type { AxiosRequestConfig } from "axios";
import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import type { SuccessProps } from "./types.js";
import type { VerifyPayment } from "./types.js";

const verify = (
	data: VerifyPayment,
	{
		config,
		onFetching,
		onSuccess,
		onError,
		onSettled,
	}: {
		onFetching?: () => void;
		onSuccess?: (data: SuccessProps) => void;
		onError?: (error: string) => void;
		onSettled?: () => void;
		config?: AxiosRequestConfig<unknown>;
	},
) => {
	return handler(post(getUrl("payment", "v1", "verify"), data, config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (data) => onSuccess?.(data),
		onSettled: () => onSettled?.(),
	});
};

export default verify;
