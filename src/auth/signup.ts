import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import type { AuthRequestParams, SignupRequest } from "./types.js";

const signup = (
	data: SignupRequest,
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
	return handler(post(getUrl("auth", "v1", "signup"), data, config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (data) => onSuccess?.(data),
		onSettled: () => onSettled?.(),
	});
};

export default signup;
