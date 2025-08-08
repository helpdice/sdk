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

export interface SuccessProps {
	data: unknown;
	status: number;
	statusText: string;
}

export interface StartSuccessProp {
	_id: string;
	options: {
		handler: (res: unknown) => void;
	};
	method: string;
}

export type { Payment, Method, VerifyPayment };
