import type { AuthRequestParams } from "../auth/types.js";
import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import type { Invoice } from "./types.js";

const createInvoice = (
	data: Invoice,
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
		config?: { params: AuthRequestParams };
	},
) => {
	return handler(post(getUrl("accounting", "v1", "invoice"), data, config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (data) => onSuccess?.(data),
		onSettled: () => onSettled?.(),
	});
};

export default createInvoice;
