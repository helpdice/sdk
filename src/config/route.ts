import account from "../account/endpoint.js";
import accounting from "../accounting/endpoint.js";
import assets from "../assets/endpoint.js";
import auth from "../auth/endpoint.js";
import cms from "../content/endpoint.js";
import payment from "../payment/endpoint.js";
import inventory from "../inventory/endpoint.js";
import support from "../support/endpoint.js";

interface CategoryUrls {
	[version: string]: {
		[action: string]: string;
	};
}

interface Urls {
	[category: string]: CategoryUrls;
}

const urls: Urls = {
	auth,
	cms,
	account,
	accounting,
	support,
	assets,
	payment,
	inventory
};

// Function to get the URL dynamically based on category, version, and action
export function getUrl(
	category: string,
	version: string,
	action: string,
): string {
	const categoryData = urls[category]; // Access the correct category dynamically
	if (categoryData) {
		const versionData = categoryData[version]; // Access the correct version dynamically
		console.log(versionData?.[action]);
		if (versionData !== undefined) {
			console.log(versionData[action]);
			return `/api/${version}/${category}/${versionData[action]}`; // Construct the URL
		}
		throw new Error(
			`Invalid action: ${action} for version: ${version} in category: ${category}`,
		);
	}
	throw new Error(`Invalid category: ${category}`);
}
