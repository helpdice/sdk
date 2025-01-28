import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import { clearStorage, getDataFromStorage } from "../utils/localStorage.js";

const logout = (data: { data?: object }, {
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
    config?: { params: {} } 
}) => {
    return handler(post(getUrl('auth', 'v1', 'logout'), { ...data, fcm_token: getDataFromStorage('fcm_token') }, config), {
        onFetching: () => onFetching && onFetching(),
        onError: (error) => onError && onError(error),
        onSuccess: (data) => {
            clearStorage(['accountAccessToken', 'accountInfo', 'account_key']);
            onSuccess && onSuccess(data)
            window.location.href = "/"
        },
        onSettled: () => onSettled && onSettled()
    })
}

export default logout;