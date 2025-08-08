interface Item {
	item?: string;
	tax?: string;
	rate?: number;
	quantity?: number;
	amount?: number;
}

interface Tax {
	index: number;
	taxAccount: string;
	taxRate: number;
	taxAmount: number;
}

interface PaymentInfo {
	gateway?: string;
	orderId?: string;
	paymentId?: string;
}

interface SubmitInvoice {
	ids?: Array<string>;
	type?: string;
	paymentInfo?: PaymentInfo;
	paymentMethod?: string;
	isPOS?: boolean;
}

interface Invoice {
	location?: string;
	party?: string;
	date?: Date;
	items: Array<Item>;
	netTotal: number;
	discount?: number;
	gst: number;
	total: number;
	type: string;
	currency: string;
	taxes: Array<Tax>;
	status: string;
}

export type { Invoice, SubmitInvoice };
