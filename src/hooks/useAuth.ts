import React from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { AuthState } from "../redux/reducers/authReducer";
import { useCookies } from "react-cookie";
import config from "../util/config";

interface RootState {
  authState: AuthState;
}

const useAuth = () => {
  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = (token: string) => {
    dispatch({ type: "LOGIN", token: token, payload: jwt_decode(token) });
  };

  const logout = () => {
    removeCookie("token");
    dispatch({ type: "LOGOUT" });
  };

  if (!authState.token) {
    if (cookies.token) login(cookies.token);
    else window.location.replace(config.landing + "?login=true");
  }

  return {
    login: login,
    logout: logout,
    ...authState,
    token: cookies.Token || authState.token
  };
};

export default useAuth;
