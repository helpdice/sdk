import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import type { Order } from "./types.js";

const create = (
	data: Order,
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
		config?: object;
	},
) => {
	return handler(post(getUrl("order", "v1", "create"), data, config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (data) => onSuccess?.(data),
		onSettled: () => onSettled?.(),
	});
};

export default create;
