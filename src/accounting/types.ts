interface Item {
    item?: string;
    tax?: string;
    rate?: number;
    quantity?: number;
    amount?: number;
}

interface Tax {
    index: number,
    taxAccount: string,
    taxRate: number,
    taxAmount: number
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

export type { Invoice };