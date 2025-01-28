// import cookie from "js-cookie";
// import Router from "next/router";
// import useUser from "./useUser.js";

// const useAuth = () => {
//   const { mutate } = useUser();

//   const login = (
//     token: string,
//     url: string = "/",
//     noRedirect: boolean = false
//   ) => {
//     cookie.set("token", token, { expires: 1 });
//     mutate();
//     !noRedirect && Router.push(url);
//   };

//   const logout = () => {
//     cookie.remove("token");
//     mutate();
//     Router.replace("/");
//   };
//   return { login, logout };
// };

// export default useAuth;