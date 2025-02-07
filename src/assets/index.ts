import { BASE_URL } from "../config/axios.js";
import { getUrl } from "../config/route.js";

const Assets = {
	images: {
		imagePlaceholder: BASE_URL + getUrl("assets", "v1", "imagePlaceholder"),
		avatar: BASE_URL + getUrl("assets", "v1", "avatar"),
	},
};

export default Assets;
