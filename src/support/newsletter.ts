import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";

const newsletter = (data: any, {
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
    config?: { params: any } 
}) => {
    return handler(post(getUrl('support', 'v1', 'newsletter'), data, config), {
        onFetching: () => onFetching && onFetching(),
        onError: (error) => onError && onError(error),
        onSuccess: (data) => onSuccess && onSuccess(data),
        onSettled: () => onSettled && onSettled() 
    })
}

export default newsletter;