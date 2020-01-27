import React from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { AuthState } from "../redux/reducers/authReducer";
import { useCookies } from "react-cookie";

interface RootState {
  authState: AuthState;
}

const useAuth = () => {
  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = (token: string) => {
    console.log("trying to login");
    dispatch({ type: "LOGIN", token: token, payload: jwt_decode(token) });
  };

  const logout = () => {
    removeCookie("token");
    dispatch({ type: "LOGOUT" });
  };

  if (!authState.token) {
    if (cookies.token) login(cookies.token);
  }

  return {
    login: login,
    logout: logout,
    ...authState,
    token: cookies.Token || authState.token
  };
};

export default useAuth;
