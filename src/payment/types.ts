type Method = {
	label: string; // Paypal, RazorPay, Stripe
	currency: number | string;
};

type Payment = {
	data: unknown;
	token: string;
	method: Method;
	amount: string | number;
	entity: unknown;
	term: number;
};

type VerifyPayment = {
	id: string;
	payment: unknown;
};

export type { Payment, Method, VerifyPayment };
