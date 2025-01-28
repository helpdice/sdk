import { get } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import newsletter from "./newsletter.js";
import ticket from "./ticket.js";

const Support = {
	ticket,
	newsletter,
	tickets: (config?: object | undefined) =>
		get(getUrl("support", "v1", "tickets"), config),
};

export default Support;
