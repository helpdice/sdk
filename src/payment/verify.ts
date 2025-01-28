import handler from "../config/handler.js";
import { post } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import type { VerifyPayment } from "./types.js";

const verify = (data: VerifyPayment, {
    config,
    onFetching,
    onSuccess, 
    onError, 
    onSettled
}: {
    onFetching?: () => void;
    onSuccess?: (data: object) => void;
    onError?: (error: string) => void;
    onSettled?: () => void;
    config?: any
}) => {
    return handler(post(getUrl('payment', 'v1', 'verify'), data, config), {
        onFetching: () => onFetching && onFetching(),
        onError: (error) => onError && onError(error),
        onSuccess: (data) => onSuccess && onSuccess(data),
        onSettled: () => onSettled && onSettled() 
    })
}

export default verify;