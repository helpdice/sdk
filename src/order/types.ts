type Order = {
	entity: object;
	entityId: string;
	orderId: string;
	paymentType: string;
	paymentService: string;
	amount: string | number;
	currency: string | number;
};

export type { Order };
