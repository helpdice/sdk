import { getUrl } from "../config/route.js";
import { get } from "../config/axios.js";
import ticket from "./ticket.js";
import newsletter from "./newsletter.js";

const Support  = {
  ticket,
  newsletter,
  tickets: (config?: object | undefined) => get(getUrl('support', 'v1', 'tickets'), config),
}

export default Support;