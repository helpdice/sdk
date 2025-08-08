import type { AxiosResponse } from "axios";

// Define type for the handler options
interface AxiosRequestHandlerOptions {
	promise: Promise<AxiosResponse<any>>; // The promise that resolves with Axios response
	onLoading?: (isLoading: boolean) => void; // Callback to show/hide loading state
	onSuccess?: (data: any) => void; // Callback for success response
	onError?: (error: any) => void; // Callback for error response
	onSettled?: () => void; // Callback for when request finishes (either success or failure)
	onProgress?: (progress: string) => void; // Callback for progress updates
}

const handler = ({
	promise,
	onLoading = () => {},
	onSuccess = () => {},
	onError = () => {},
	onSettled = () => {},
	onProgress = () => {},
}: AxiosRequestHandlerOptions): void => {
	// Call onLoading at the start to show loading state
	onLoading(true);

	// Handling the passed promise
	promise
		.then((response: AxiosResponse) => {
			// Show success state
			console.log("Request Success:", response);

			// Execute success callback if provided
			if (onSuccess) {
				onSuccess(response.data);
			}
		})
		.catch((error: any) => {
			// Show error state
			console.error("Request Error:", error);

			// Execute error callback if provided
			if (onError) {
				onError(error);
			}
		})
		.finally(() => {
			// Execute settled callback (on success or error)
			if (onSettled) {
				onSettled();
			}

			// Call onLoading to hide loading indicator after completion
			onLoading(false);

			// Hide loading indicator
			console.log("Request Completed");
		});
};

export default handler;
