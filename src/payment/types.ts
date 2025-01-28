type Method = {
	label: string; // Paypal, RazorPay, Stripe
	currency: number | string;
};

type Payment = {
	data: never;
	token: string;
	method: Method;
	amount: string | number;
	entity: never;
	term: number;
};

type VerifyPayment = {
	id: string;
	payment: never;
};

export type { Payment, Method, VerifyPayment };
