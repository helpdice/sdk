import { get } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import createInvoice from "./createInvoice.js";
import submitInvoice from "./submitInvoice.js";
import updateInvoice from "./updateInvoice.js";

const Accounting = {
	item: (slug: string) =>
		get(getUrl("accounting", "v1", "item"), {
			params: {
				slug,
			},
		}),
	items: (config?: object | undefined) =>
		get(getUrl("accounting", "v1", "items"), config),
	createInvoice,
	updateInvoice,
	invoices: (config?: object | undefined) =>
		get(getUrl("accounting", "v1", "invoices"), config),
	submitInvoice
};

export default Accounting;
