"use client"

import useSWR from "swr";

import { getUrl } from "../config/route.js";
import Account from "../account/index.js";

const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(getUrl('account', 'v1', 'profile'), Account.profile);

  const loggedOut = error && error.status === 403;

  return { user, isLoading, error, loggedOut, mutate };
};

export default useUser;
