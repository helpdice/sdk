import { get } from "../config/axios.js";
import { getUrl } from "../config/route.js";

const Inventory = {
	getStoreById: (id: string) =>
		get(getUrl("inventory", "v1", "store"), {
			params: {
				id,
			},
		}),
	getStoreBySlug: (slug: string) =>
		get(getUrl("inventory", "v1", "store"), {
			params: {
				slug,
			},
		}),
	getStoreProducts: (
		slug: string,
		category: string,
		brand: string,
		price: string,
		search: string,
	) =>
		get(getUrl("inventory", "v1", "store_products"), {
			params: {
				slug,
				category,
				brand,
				price,
				search,
			},
		}),
};

export default Inventory;
