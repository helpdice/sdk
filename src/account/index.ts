import { get } from "../config/axios.js";
import { getUrl } from "../config/route.js";

const Account  = {
  profile: () => get(getUrl('account', 'v1', 'profile'))
}

export default Account;
