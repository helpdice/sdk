import type { AxiosRequestConfig } from "axios";
import { post } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import handler from "../utils/handler.js";

// Optional: if you have defined Order/VerifyPayment types
// import type { Order } from "../order/types.js";
// import type { VerifyPayment } from "./types.js";

declare global {
	interface Window {
		Razorpay: any; // Ideally, use proper types from @types/razorpay
	}
}

interface PaymentData {
	amount: number;
	currency: string;
	paymentService: string;
	[key: string]: any;
}

interface StartOptions {
	config?: AxiosRequestConfig | null;
	onLoading?: (isLoading: boolean) => void;
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	onSettled?: () => void;
}

function start(
	data: PaymentData,
	{
		config = null,
		onLoading = () => {},
		onSuccess = () => {},
		onError = () => {},
		onSettled = () => {},
	}: StartOptions = {},
): void {
	return handler({
		promise: post(
			getUrl("payment", "v1", "create"),
			{
				...data,
				method: {
					label: data.paymentService,
					currency: data.currency,
				},
			},
			config || undefined,
		),
		onLoading,
		onError: (error) => onError(error),
		onSuccess: (responseData: any) => {
			if (responseData?.method === "Razor Pay") {
				const options = responseData.options;
				options.handler = async (response: any) => {
					// console.log("Payment Success:", response);
					onSuccess(response);
					// Validation call (if needed)
				};

				const rzp1 = new window.Razorpay(options);

				rzp1.on("payment.failed", (response: any) => {
					onError(response);
				});

				rzp1.open();
			}
		},
		onSettled,
	});
}

export default start;
