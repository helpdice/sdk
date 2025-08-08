import { post } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import handler from "../utils/handler.js";
// import type { Order } from "../order/types.js";
// import type { VerifyPayment } from "./types.js";
// import verify from "./verify.js";

function start(
	data,
	{ config, onLoading, onSuccess, onError, onSettled } = {
		config: null,
		onLoading: (isLoading) => {},
		onSuccess: (data) => {},
		onError: (error) => {},
		onSettled: () => {},
	},
) {
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
			config,
		),
		onLoading,
		onError,
		onSuccess: (data) => {
			if (data?.method === "Razor Pay") {
				// eslint-disable-next-line
				const rzp1 = new window.Razorpay(data.options);
				const options = data.options;
				options.handler = async (response) => {
					console.log("Payment Success :", response);
					onSuccess(response);
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
				rzp1.on("payment.failed", (response) => {
					// console.log('Payment Failed :', response);
					onError(response);
					// alert(response.error.code);
					// alert(response.error.description);
					// alert(response.error.source);
					// alert(response.error.step);
					// alert(response.error.reason);
					// alert(response.error.metadata.order_id);
					// alert(response.error.metadata.payment_id);
				});
				rzp1.open();
			}
		},
		onSettled,
	});
}

export default start;
