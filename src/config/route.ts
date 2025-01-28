import cms from "../content/endpoint.js";
import auth from "../auth/endpoint.js";
import account from "../account/endpoint.js";
import accounting from "../accounting/endpoint.js";
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
    support
}


// Function to get the URL dynamically based on category, version, and action
export function getUrl(category: string, version: string, action: string): string {
  const categoryData = urls[category]; // Access the correct category dynamically
  if (categoryData) {
    const versionData = categoryData[version]; // Access the correct version dynamically
    if (versionData && versionData[action]) {
      return `/api/${version}/${category}/${versionData[action]}`; // Construct the URL
    } else {
      throw new Error(`Invalid action: ${action} for version: ${version} in category: ${category}`);
    }
  } else {
    throw new Error(`Invalid category: ${category}`);
  }
}