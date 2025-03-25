// import { baseApiURL } from 'utils/config';
// import API from 'utils/axios';

// export const getExchangeRates = async (from?: string, to?: string) => {
//     const config = {
//         params: {
//             from,
//             to
//         }
//     };
//     const { data } = await API.get(`${baseApiURL}/tools/exchange-rates`, config);
//     return data.rates;
// };

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
