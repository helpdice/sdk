import handler from "../config/handler.js";
import { post } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import type { Order } from "../order/types.js";
import verify from "./verify.js";

const start = (data: Order, {
    config,
    onFetching,
    onSuccess,
    onError,
    onSettled
}: {
    onFetching?: () => void;
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
    onSettled?: () => void;
    config?: any
}) => {
    return handler(post(getUrl('payment', 'v1', 'create'), data, config), {
        onFetching: () => onFetching && onFetching(),
        onError: (error) => onError && onError(error),
        onSuccess: (data: any) => {
            if (data?.method === 'RazorPay') {
                const options = data.options;
                options.handler = async (response: any) => {
                    // toast.dismiss();
                    const body = {
                        id: data._id,
                        payment: response
                    };
                    verify(body, {
                        onSuccess(data) {
                            onSuccess && onSuccess(data)
                        },
                        onError(error) {
                            onError && onError(error)
                        },
                    })
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
        onSettled: () => onSettled && onSettled()
    })
}

export default start;