import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
import type { Order } from "../order/types.js";
import type { VerifyPayment } from "./types.js";
import verify from "./verify.js";

export interface SuccessProps {
	data: unknown;
	status: number;
	statusText: string;
}

export interface StartSuccessProp {
	_id: string;
	options: {
		handler: (res: never) => void;
	};
	method: string;
}

const start = (
	data: Order,
	{
		config,
		onFetching,
		onSuccess,
		onError,
		onSettled,
	}: {
		onFetching?: () => void;
		onSuccess?: (data: SuccessProps) => void;
		onError?: (error: string) => void;
		onSettled?: () => void;
		config?: object;
	},
) => {
	return handler(post(getUrl("payment", "v1", "create"), data, config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (res: SuccessProps) => {
			const data: StartSuccessProp = res.data as StartSuccessProp;
			if (data?.method === "RazorPay") {
				const options = data.options;
				options.handler = async (response: never) => {
					// toast.dismiss();
					const body: VerifyPayment = {
						id: data._id,
						payment: response,
					};
					verify(body, {
						onSuccess(data) {
							onSuccess?.(data);
						},
						onError(error) {
							onError?.(error);
						},
					});
					// const validateRes = await fetch('http://localhost:5000/order/validate', {
					//     method: 'POST',
					//     body: JSON.stringify(body),
					//     headers: {
					//         'Content-Type': 'application/json'
					//     }
					// });
					// const jsonRes = await validateRes.json();
					// console.log(jsonRes);
				};
				// eslint-disable-next-line
				// window['RazorPay'] = null;
				// var rzp1 = new window.Razorpay(data.options);
				// rzp1.on('payment.failed', function (response: any) {
				//     // toast.dismiss();
				//     onError && onError(response.error);
				//     // toast.error('Payment Failed, Please Try Again Later');

				//     // alert(response.error.code);
				//     // alert(response.error.description);
				//     // alert(response.error.source);
				//     // alert(response.error.step);
				//     // alert(response.error.reason);
				//     // alert(response.error.metadata.order_id);
				//     // alert(response.error.metadata.payment_id);
				// });
				// rzp1.open();
			}
		},
		onSettled: () => onSettled?.(),
	});
};

export default start;
