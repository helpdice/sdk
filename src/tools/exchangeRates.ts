import { get, post } from "../config/axios.js";
import handler from "../config/handler.js";
import { getUrl } from "../config/route.js";

const exchangeRates = (
	data: unknown,
	{
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
		config?: {
			params: {
				from?: string;
				to?: string;
			};
		};
	},
) => {
	return handler(get(getUrl("tools", "v1", "exchangeRates"), config), {
		onFetching: () => onFetching?.(),
		onError: (error) => onError?.(error),
		onSuccess: (data) => onSuccess?.(data),
		onSettled: () => onSettled?.(),
	});
};

export default exchangeRates;

// export async function convertCurrency(amount: number, fromCurrency?: string, toCurrency?: string) {
//     try {
//         const rates = await getExchangeRates(fromCurrency);
//         if (!rates[toCurrency]) {
//             throw new Error(`Currency ${toCurrency} is not available.`);
//         }
//         const convertedAmount = (amount * rates[toCurrency]).toFixed(2);
//         return convertedAmount;
//     } catch (error) {
//         console.error('Error converting currency:', error);
//         throw error;
//     }
// }
