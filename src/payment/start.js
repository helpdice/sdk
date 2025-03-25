import { post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";
// import type { Order } from "../order/types.js";
// import type { VerifyPayment } from "./types.js";
import verify from "./verify.js";

const start = (
	data,
	{
		config,
		onFetching,
		onSuccess,
		onError,
		onSettled,
	},
) => {
	return handler(post(getUrl("payment", "v1", "create"), {
		...data, method: {
			label: data.paymentService,
			currency: data.currency
		}
	}, config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (res) => {
			const data = res.data;
			if (data?.method === "Razor Pay") {
				const options = data.options;
				options.handler = async (response) => {
					console.log('Payment Success :', response);
					onSuccess && onSuccess(response);
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
				var rzp1 = new window.Razorpay(data.options);
				rzp1.on('payment.failed', function (response) {
					console.log('Payment Failed :', response);
					onError && onError(response);
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
		onSettled: () => onSettled?.(),
	});
};

export default start;
