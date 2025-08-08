import { get } from "../config/axios.js";
import { getUrl } from "../config/route.js";
import updateProfile from "./update_profile.js";

const Account = {
	profile: (id: string) =>
		get(getUrl("account", "v1", "profile"), {
			params: {
				id,
			},
		}),
	updateProfile,
};

export default Account;
