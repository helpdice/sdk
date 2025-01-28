import { get } from "../config/axios.js";
import { getUrl } from "../config/route.js";

const Accounting = {
	item: (slug: string) =>
		get(getUrl("accounting", "v1", "item"), {
			params: {
				slug,
			},
		}),
	items: (config?: object | undefined) =>
		get(getUrl("accounting", "v1", "items"), config),
};

export default Accounting;
