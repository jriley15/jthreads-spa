import React from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { AuthState } from "../redux/reducers/authReducer";

interface RootState {
  authState: AuthState;
}

const useAuth = () => {
  const authStateSelector = (state: RootState) => state.authState;
  const authState = useSelector(authStateSelector);
  const dispatch = useDispatch();

  const login = (token: string) => {
    dispatch({ type: "LOGIN", token: token, payload: jwt_decode(token) });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  return {
    login: login,
    logout: logout,
    ...authState
  };
};

export default useAuth;
