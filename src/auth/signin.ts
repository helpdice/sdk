import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import type { AuthRequest, AuthRequestParams } from "./types.js";
import { getUrl } from "../config/route.js";

const signin = (data: AuthRequest, {
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
    config?: { params: AuthRequestParams } 
}) => {
    return handler(post(getUrl('auth', 'v1', 'signin'), data, config), {
        onFetching: () => onFetching && onFetching(),
        onError: (error) => onError && onError(error),
        onSuccess: (data) => onSuccess && onSuccess(data),
        onSettled: () => onSettled && onSettled() 
    })
}

export default signin;