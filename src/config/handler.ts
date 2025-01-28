import type { AxiosResponse } from "axios";

// Define the type for the callbacks object
export interface Callbacks {
    onFetching?: () => void;
    onSuccess?: (response: { data: any, status: number, statusText: string }) => void;
    onError?: (error: string) => void;
    onSettled?: () => void;
}

// The fetchDataWithCallbacks function that accepts a Promise and a callbacks object
async function handler(promise: Promise<AxiosResponse>, callbacks?: Callbacks) {
    // Destructure callbacks from the object
    const { onFetching, onSuccess, onError, onSettled } = callbacks ?? {}

    // Call the onFetching callback before making the request
    if (onFetching) onFetching();

    // Handle the Promise passed as an argument
    promise
        .then((response: any) => {
            // Call the onSuccess callback if the Promise resolves successfully
            if (onSuccess) onSuccess({
                data: response.data,
                status: response.status,
                statusText: response.statusText
            });
        })
        .catch((error) => {
            // Call the onError callback if the Promise is rejected
            if (onError) onError(error);
        })
        .finally(() => {
            // Call the onSettled callback after the Promise is settled
            if (onSettled) onSettled();
        });
}

export default handler;

